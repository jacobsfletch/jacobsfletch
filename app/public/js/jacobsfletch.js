/*	======================================

	Fras JS v1.0

	Copyright 2016 Commonground Design Co.

========================================= */

var fras = (function () {

    //- - - - - - - - - - - - - - - - - - - - - - - -
    //	Extend the Global Enviornment
    //- - - - - - - - - - - - - - - - - - - - - - - -

    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||

        function (callback) {
            return setTimeout(callback, 1000 / 60);
        };

    throttle = function (type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function () {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function () {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize"); // Use: window.addEventListener('optimizedResize', {Function})
    throttle("scroll", "optimizedScroll"); // Use: window.addEventListener('optimizedSCroll', {Function})

    //- - - - - - - - - - - - - - - - - - - - - - - -
    //	Math
    //- - - - - - - - - - - - - - - - - - - - - - - -

    //t = current time
    //b = start value
    //c = change in value
    //d = duration

    Math.linearTween = function (t, b, c, d) {
        return c * t / d + b;
    };

    Math.easeInOutCirc = function (t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }

    Math.easeInOutQuart = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    Math.easeInOutQuint = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    };

    Math.easeInOutExpo = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    };
    //- - - - - - - - - - - - - - - - - - - - - - - -
    //	Initialize Fras Schema
    //- - - - - - - - - - - - - - - - - - - - - - - -

    var fras = {
        trackers: {
            dimensions: {
                winH: window.innerHeight,
                winW: window.innerWidth
            }
        },
        config: {},
        utils: {
            math: {},
            dom: {},
            events: {},
            fc: {},
        },
        animate: {},
        components: {},
        modules: {}
    };

    window.addEventListener('optimizedResize', function () {
        fras.trackers.dimensions.winH = window.innerHeight;
        fras.trackers.dimensions.winW = window.innerWidth;
    });

    return fras;

})();

fras.animate = {
    tween: function (start, to, fc, callback, duration, ease, increment) {
        var self = this;
        var change = to - start,
            increment = increment || 20,
            ease = ease || 'easeInOutCirc',
            last = start,
            timer;
        this.currentTime = 0;
        this.stopped = false;
        this.paused = false;
        this.stop = function () {
            self.stopped = true;
            self.currentTime = 0;
        }
        this.pause = function () {
            self.paused = true;
        }
        this.play = function () {
            self.stopped = false;

            function runAnimation() {
                if (self.stopped == true) {
                    if (typeof callback == 'function') callback();
                } else {
                    self.currentTime += increment;
                    var val = Math[ease](self.currentTime, start, change, duration);
                    fc(val, self.currentTime);
                    last = val;
                    if (self.currentTime < duration && !self.paused) {
                        timer = setTimeout(runAnimation, increment);
                    } else {
                        if (typeof callback == 'function') callback();
                    }
                }
            }
            runAnimation();
        };
        if (!(this instanceof fras.animate.tween)) {
            var tween = new fras.animate.tween(start, to, fc, callback, duration, ease, increment);
            tween.play()
            return tween;
        }
    },
    slideDown: function (el, js, duration, callback) {
        var height = el.scrollHeight;
        var current_height = el.offsetHeight;
        fras.utils.dom.removeClass(el, 'is-up');
        fras.utils.dom.addClass(el, 'is-down');
        if (js) {
            var start = current_height;
            var to = height;
            var duration = duration || 300;
            if (el.tween && typeof el.tween == 'function') {
                el.tween.stop();
            }
            el.tween = this.tween(to, start, duration, slide, callback);

            function slide(val) {
                el.style.height = val + 'px';
            }
            return el.tween;
        } else {
            if (el.offsetHeight < 1) {
                if (!fras.utils.dom.hasClass(el, 'is-active')) {
                    setTimeout(function () {
                        fras.utils.dom.addClass(el, 'is-active');
                        el.style.height = height + 'px';
                    }, 1);
                } else {
                    el.style.height = height + 'px';
                }
            }
        }
    },
    slideUp: function (el, js, duration, callback) {
        fras.utils.dom.removeClass(el, 'is-down');
        fras.utils.dom.addClass(el, 'is-up');

        if (js) {
            var start = current_height;
            var to = 0;
            var duration = duration || 300;
            if (el.tween && typeof el.tween == 'function') {
                el.tween.stop();
            }
            el.tween = this.tween(to, start, duration, slide, callback);

            function slide(val) {
                el.style.height = val + 'px';
            }
            return el.tween;
        } else {
            el.style.height = el.scrollHeight + 'px';
            if (!fras.utils.dom.hasClass(el, 'is-active')) {
                setTimeout(function () {
                    fras.utils.dom.removeClass(el, 'is-active');
                    el.style.height = '0';
                }, 1);
            } else {
                el.style.height = '0';
            }
        }
    },
    slideToggle: function (el, js, duration, callback) {
        if (el.offsetHeight < 1) {
            this.slideDown(el, js, duration, callback);
        } else {
            this.slideUp(el, js, duration, callback);
        }
    },
    scrollTo: function (el, to, duration, callback) {
        if (el == 'window') {
            el = window.scrollTo ? window : document.documentElement;
        } else {
            el = typeof el == 'string' ? document.querySelector(el) : el;
        }
        var start = el.scrollTop || el.scrollY;
        if (el.tween && el.tween instanceof fras.animate.tween) {
            el.tween.stop();
        }
        el.tween = this.tween(start, to, function (val) {
            if (el.scrollTop) {
                el.scrollTop(val);
            } else {
                el.scrollTo(0, val);
            }
        }, callback, duration);
        el.addEventListener('wheel', function () {
            el.tween.stop();
        });
        return el.tween;
    },
    scrollToElement: function (element, duration, position, callback) {
        var winH = fras.trackers.dimensions.winH;
        var win_scroll = window.pageYOffset || document.documentElement.scrollTop;
        var height = element.offsetHeight;
        var offset = element.getBoundingClientRect();
        var to = win_scroll + offset.top;
        var speed = (Math.abs(win_scroll - to) / 1000) * duration;
        speed = speed < duration / 2 ? duration / 2 : speed;
        switch (position) {
        case 'bottom':
            to = win_scroll + offset.top + (height - winH);
            break;
        case 'center':
            to = to - winH / 2 + height / 2;
            to = height > winH ? win_scroll + offset.top : to;
            break;
        case 'below':
            to = win_scroll + offset.top + height;
            break;
        }
        if (fras.trackers.scrolling) {
            fras.trackers.stopscroll = true;
            window.setTimeout(function () {
                fras.trackers.stopscroll = false;
                this.scrollTo('window', to, speed, callback);
            }, 30)
        } else {
            this.scrollTo('window', to, speed, callback);
        }
    }
}

fras.utils.data = {	
	// Get Age from Birthdate
	getAge : function(birth) {
	
	    var today = new Date();
	    var nowyear = today.getFullYear();
	    var nowmonth = today.getMonth();
	    var nowday = today.getDate();
	
	    var birthyear = birth.getFullYear();
	    var birthmonth = birth.getMonth();
	    var birthday = birth.getDate();
	
	    var age = nowyear - birthyear;
	    var age_month = nowmonth - birthmonth;
	    var age_day = nowday - birthday;
	   
	    if(age_month < 0 || (age_month == 0 && age_day <0)) {
	            age = parseInt(age) -1;
	        }
	    return(age);
	},
	getHeight : function(height) {
		height = Math.floor(height/12) + "' " + (height%12) + '"' ;
	  return(height);
	},
	
	getMonthName : function(month){
		monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return monthName[month];
	}
}
fras.utils.dom = {
    isElementInViewport: function (el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    },
    isElementVisible: function (el) {

        var rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom > 0
        );
    },
    cumulativeOffset: function (el) {
        var top = 0,
            left = 0;
        do {
            top += el.offsetTop || 0;
            left += el.offsetLeft || 0;
            el = el.offsetParent;
        } while (el);

        return {
            top: top,
            left: left
        };
    },
    centerOffset: function (top, height, scroll, winh) {
        var center_win = scroll + winh / 2;
        var center_el = top + (height / 2);
        var off_center = center_el - center_win;
        return off_center;
    },
    createElement: function (el_tag, content, class_stack, attributes, append_el) {
        // Create el
        var el = document.createElement(el_tag);
        el.innerHTML = content;
        if (class_stack) fras.utils.dom.addClass(el, class_stack);

        if (Array.isArray(attributes)) {
            attributes.forEach(function (attr, i) {
                el.setAttribute(attr.name, attr.value);
            });
        }
        if (append_el) append_el.appendChild(el);
        return el;
    },
    killElement: function (el, time, options, callback) {
        if (typeof options == 'object') {
            if (options.remove_class) fras.utils.dom.removeClass(el, options.remove_class);
            if (options.add_class) fras.utils.dom.removeClass(el, options.add_class);
        }

        closeTimer = setTimeout(function () {
            el.parentNode.removeChild(el);
            if (typeof callback == 'function') callback();
        }, time);
    },
    appendElement: function (el_tag, content, class_stack, append_el) {
        // Create content container
        var el = fras.utils.dom.createElement(el_tag, content, class_stack);
        append_el.appendChild(el);

        return el;
    },
    insertAfter: function (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    },
    forEach: function (array, callback, done) {
        for (var i = 0; i < array.length; i++) {
            callback(array[i], i);
            if (i == array.length - 1 && done) {
                done();
            }
        }
    },
    htmlToElement: function (html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    },
    addClass: function (element, class_name) {
        class_name = class_name.split(' ');
        if (element && element.length && element.length > 0) {
            for (i = 0; i < element.length; i++) {
                doAction(element[i]);
            }
        } else {
            doAction(element);
        }

        function doAction(element) {
            if (typeof element == 'object') {
                for (var i = 0; i < class_name.length; i++) {
                    if (element.classList) {
                        element.classList.add(class_name[i]);
                    } else if (!fras.utils.dom.hasClass(element, class_name[i])) {
                        element.className += " " + class_name[i]
                    }
                }
            }
        }
    },
    removeClass: function (element, class_name) {
        class_name = class_name.split(' ');
        if (element && element.length && element.length > 0) {
            for (i = 0; i < element.length; i++) {
                doAction(element[i]);
            }
        } else {
            doAction(element);
        }

        function doAction(element) {
            if (typeof element == 'object') {
                if (class_name.length > 1) {
                    for (var i = 0; i < class_name.length; i++) {

                        if (element.classList) {
                            element.classList.remove(class_name[i]);

                        } else if (fras.utils.dom.hasClass(element, class_name[i])) {
                            var reg = new RegExp('(\\s|^)' + class_name[i] + '(\\s|$)');
                            element.className = element.className.replace(reg, ' ');
                        }
                    }
                } else {
                    if (element.classList) {
                        element.classList.remove(class_name[0]);

                    } else if (fras.utils.dom.hasClass(element, class_name[0])) {
                        var reg = new RegExp('(\\s|^)' + class_name[0] + '(\\s|$)');
                        element.className = element.className.replace(reg, ' ');
                    }
                }
            }
        }
    },
    toggleClass: function (el, class_name) {
        if (fras.utils.dom.hasClass(el, class_name)) {
            fras.utils.dom.removeClass(el, class_name);
        } else {
            fras.utils.dom.addClass(el, class_name);
        }
    },
    hasClass: function (element, class_name) {
        if (typeof element == 'object') {
            if (element.classList)
                return element.classList.contains(class_name)
            else if (element.className)
                return !!element.className.match(new RegExp('(\\s|^)' + class_name + '(\\s|$)'))
        } else {
            return false;
        }
    }

}

fras.utils.events =  {
	observeDOM : (function(){
	 var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
	     eventListenerSupported = window.addEventListener;
	
	 return function(obj, callback){
	     if( MutationObserver ){
	         // define a new observer
	         var obs = new MutationObserver(function(mutations, observer){
	             if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
	                 callback();
	         });
	         // have the observer observe foo for changes in children
	         obs.observe( obj, { childList:true, subtree:true });
	     }
	     else if( eventListenerSupported ){
	         obj.addEventListener('DOMNodeInserted', callback, false);
	         obj.addEventListener('DOMNodeRemoved', callback, false);
	     }
	 }
	})()
}
fras.utils.fc = {
	// Will only fire when the function hasn't been called in the amount of time set by @wait
	debounce : function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
}
/*	======================================

		Polyfills

========================================= */

fras.polyFills = (function () {
    /**
     * isArray Polyfill
     */
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    /**
     * Custom Event Polyfill
     */
    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;

    //- - - - - - - - - - - - - - - - - - - - - - - -
    //	IE Shit
    //- - - - - - - - - - - - - - - - - - - - - - - -

    function getInternetExplorerVersion() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    fras.trackers.ie = getInternetExplorerVersion();

    if (fras.trackers.ie < 10 && fras.trackers.ie > 0) {
        document.body.className += " " + 'ie ie-' + fras.trackers.ie;
        var full_h = document.querySelectorAll('.ie-full-height');
        fras.utils.dom.forEach(full_h, function (el) {
            el.style.height = el.parentNode.offsetHeight + 'px';
        });
    } else {
        var full_h = document.querySelectorAll('.ie-full-height');
        fras.utils.dom.removeClass(full_h, 'ie-full-height');
    }

})();

fras.ajax = (function () {

    var ajax = {},
        addClass = fras.utils.dom.addClass,
        removeClass = fras.utils.dom.removeClass;
    ajax.params = function (obj) {
        var pairs = [];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            pairs.push(prop + '=' + obj[prop]);
        }
        return pairs.join('&');
    };

    ajax.serialize = function (form) {
        if (typeof form == 'object' && form.nodeName == "FORM") {
            var field, l, s = [];
            var len = form.elements.length;
            for (var i=0; i<len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        l = form.elements[i].options.length;
                        for (var j=0; j<l; j++) {
                            if(field.options[j].selected)
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            }
            return s.join('&').replace(/%20/g, '+');
        }else if(form !== undefined) {
            var obj = form;
            var returnVal;
            switch (obj.constructor) {
            case Array:
                var vArr = "[";
                for (var i = 0; i < obj.length; i++) {
                    if (i > 0) vArr += ",";
                    vArr += ajax.serialize(obj[i]);
                }
                vArr += "]"
                return vArr;
            case String:
                returnVal = escape("'" + obj + "'");
                return returnVal;
            case Number:
                returnVal = isFinite(obj) ? obj.toString() : null;
                return returnVal;
            case Date:
                returnVal = "#" + obj + "#";
                return returnVal;
            default:
                if (typeof obj == "object") {
                    var vobj = [];
                    for (attr in obj) {
                        if (typeof obj[attr] != "function") {
                            vobj.push('"' + attr + '":' + ajax.serialize(obj[attr]));
                        }
                    }
                    if (vobj.length > 0)
                        return "{" + vobj.join(",") + "}";
                    else
                        return "{}";
                } else {
                    return obj.toString();
                }
            }
        }
        return null;
    }

    ajax.post = function (args) {
        var xhr = new XMLHttpRequest();

        if (args.type == 'json') {
            args.data = JSON.stringify(args.data);
        } else if (args.dataobj) {
            args.data = ajax.serialize(args.dataobj);
        } else if (args.data) {
            if(window.FormData) {
                args.data = new FormData(args.data);
            }else { // ie9 fallback
                args.data = ajax.serialize(args.data);
            }
        }

        args = {
            type: args.type,
            method: args.data ? 'POST' : 'GET',
            url: args.url,
            data: args.data,
            append: args.append ? args.append : false,
            success: args.success ? args.success : function (res) {},
            err: args.err ? args.err : function (res) {}
        };

        // Append args.append object to data.
        if(window.FormData && args.append) {
            args.data.append(args.append);
        }else if(args.append){ // ie9 fallback
            var append = ajax.serialize(args.append);
            args.data = args.data + '&' + append;
        }

        // We define what will happen if the data is successfully sent
        xhr.addEventListener("load", function (event) {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var response = xhr.responseText;
                if (xhr.status == 200) {
                    if (args.type == 'json') response = JSON.parse(response);
                    args.success(response);
                } else if (xhr.status == 400) {
                    var message = 'Not Found';
                    if (args.type == 'json') message = {
                        error: message
                    };
                    args.err(message);
                } else {
                    if (args.type == 'json') response = JSON.parse(response);
                    args.err(response);
                }
            }
        });

        // We define what will happen in case of error
        xhr.addEventListener("error", function (event) {
            args.err('There was an issue with your request, please try again.');
        });

        // We setup our request
        xhr.open(args.method, args.url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (args.type == 'json') {
            xhr.setRequestHeader("Content-Type", "application/json");
        }else if(window.FormData == null) { // ie9 fallback
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
        }

        // Send the Data
        xhr.send(args.data);

    }

    ajax.loadView = function (url, el, success, err) {
        addClass(el, 'loading');
        this.post({
            url: url,
            success: function (res) {
                el.innerHTML = res;
                if (typeof success == 'function') success();
                removeClass(el, 'loading');
            },
            err: function () {
                if (typeof err == 'function') err();
                removeClass(el, 'loading');
                addClass(el, 'error');
            }

        });
    }
    return ajax;
})();

fras.autoFill = function(selector, options) {
	var defaults = {};
	if(typeof options == 'object') {
	}else {
		options = defaults;
	}
	var utils = fras.utils;
	
	fras.listenerManager.bind([selector, initAf]);
	
	var onInput = utils.fc.debounce(function(e) {
		var el = e.target;
		var start = el.dataset.start ? el.dataset.start : 3;
		if(el.value.length > start - 1) {
				var el = e.target,
					url = el.dataset.url,
					data = {},
					af_el = el.nextElementSibling;
					data[el.name] = el.value;
					data = fras.ajax.params(data);
				fras.ajax.loadView(url+ '?' + data, af_el, function(res){
					utils.dom.addClass(af_el, 'is-active');
					utils.dom.forEach(af_el.children, function(item){
						item.addEventListener('click', function(event){
							var val = item.dataset.value;
							el.value = val;
							if(typeof options.click == 'function') options.click(item);
						});
					});
				}, function(err){
					utils.dom.removeClass(af_el, 'is-active');
				});
			}else if(el.value.length){
				af_el = el.nextElementSibling;
				af_el.innerHTML = '';
				utils.dom.removeClass(af_el, 'is-active');
			}
		}, 10);
	
	function initAf(el) {
		if(!utils.dom.hasClass(el.nextElementSibling, 'auto-fill')) {
			var af_el = utils.dom.createEl('ul', '', 'auto-fill');
			utils.dom.insertAfter(af_el, el);
		}
		el.addEventListener('input', onInput);
	}

}
fras.lazyLoad = (function(){
	var dom = fras.utils.dom;
	
	var lazyLoad = function(selector, options) {
		var els = document.querySelectorAll("img[data-src]");
		// load images that have entered the viewport
		[].forEach.call(els, function (item) {
			if (dom.isElementInViewport(item)) {
				console.log('Lazied');
				item.setAttribute("src",item.getAttribute("data-src"));
				item.removeAttribute("data-src");  
				dom.addClass(item.parentNode, 'loading');
				window.setTimeout(function(){
					dom.removeClass(item.parentNode, 'loading');
					dom.addClass(item.parentNode, 'loaded');
				}, 300);
			}
		});
		
		// if all the images are loaded, stop calling the handler
		if (els.length == 0) {
			window.removeEventListener("DOMContentLoaded", lazyLoad);
			window.removeEventListener("load", lazyLoad);
			window.removeEventListener("optimizedResize", lazyLoad);
			window.removeEventListener("optimizedScroll", lazyLoad);
		}
	}
	
	if(fras.config.lazy_load == true) {
		window.removeEventListener("DOMContentLoaded", lazyLoad);
		window.removeEventListener("load", lazyLoad);
		window.removeEventListener("optimizedResize", lazyLoad);
		window.removeEventListener("optimizedScroll", lazyLoad);
	}
	
	return lazyLoad;
})();
/*	========================================

		Event Listener Manager
		
		--Add functions to run on each element, each time the dom updates--

============================================= */
		
		
fras.listenerManager = (function(){
	var tool = {
		elements : [],
		update : function() {
			tool.elements.forEach(function(el){
				if(typeof el[0] == 'string') { // If the element provided is a css selector
					elements = document.querySelectorAll(el[0]);
					fras.utils.dom.forEach(elements, el[1]);
				}else {
					// If the element provided is an array, if not wrap single element in an array
					elements = Array.isArray(el[0])? el[0] : [el[0]];
					fras.utils.dom.forEach(elements, el[1]);
				}
			});
		},
		bind : function(element) {
			if(element.length > 2){
				element.forEach(function(element){
					tool.elements.push(element);
				})
			}else{
				tool.elements.push(element);
			}
			tool.update();
		}
	}			
	// Observe a specific DOM element:
	fras.utils.events.observeDOM(document.body, function(){ 
	    tool.update();
	});
	
	return tool;
	
})();

fras.$ = function (query) {
    el = typeof query == 'string' ? document.querySelectorAll(query) : query;
    this.element = el;
    this.selector = query;
    if (!(this instanceof fras.$)) {
        return new fras.$(query);
    }
}

fras.fn = fras.$.prototype = {
    on: function (type, fn) {
        var self = this;
        type = type.split(' ');
        var no_bubble = ['focus', 'blur', 'load', 'error', 'resize', 'readystatechange'];
        fras.utils.dom.forEach(type, function (type) {
            if (no_bubble.indexOf(type)) {
                bubbles(type);
            } else {
                noBubbles(type);
            }
        });

        function bubbles(type) {
            document.addEventListener(type, function (e) {
                var target = event.target || event.srcElement;
                // If the query is a string
                if(typeof self.selector == 'string') {
                    if (target.matches(self.selector)) {
                        fn(e, target);
                    }
                // The query is an element
                }else {
                    fras.utils.dom.forEach(self.selector, function(el) {
                        if (target == el) {
                            fn(e, target);
                        }
                    });
                }
            });
        }

        function noBubbles(type) {
            if(this.element) {
                if (Array.isArray(this.element)) {
                    fras.utils.dom.forEach(this.element, function (el) {
                        el.addEventListener(type, fn);
                    });
                } else {
                    this.element.addEventListener(type, fn);
                }
            }
        }
    },
    click: function (fn) {
        this.on('click', fn);
    },
    scroll: function (fn) {
        this.on('optimizedScroll', fn);
    },
    resize: function (fn) {
        this.on('optimizedResize', fn);
    },
    hasClass: function (className) {
        return fras.utils.dom.hasClass(this.element, className);
    },
    addClass: function (className) {
        fras.utils.dom.addClass(this.element, className);
    },
    toggleClass: function (className) {
        fras.utils.dom.toggleClass(this.element, className);
    },
    removeClass: function (className) {
        fras.utils.dom.removeClass(this.element, className);
    },
    remove: function () {
        fras.utils.dom.forEach(this.element, function (el) {
            el.parentNode.removeChild(el);
        });
    },
    find: function(selector) {
        var self = this;
        var el = fras.$(self.element.querySelectorAll(selector));
        return el;
    },
    each: function (fn) {
        fras.utils.dom.forEach(this.element, function (el, index) {
            fn(el, index);
        });
    },
    parent: function(selector){
        el = this.element[0] || this.element;
        while ((el = el.parentElement) && !el.matches(selector));
        return fras.$(el);
    }
}

fras.Validator = function(form, options) {
	form = document.getElementById(form);
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Cache fras tools
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	var createElement = fras.utils.dom.createElement;
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Set Options
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
	options = { // set default options
		success : options.success ? options.success : function() { form.submit() },
		fail : options.fail ?  options.fail : function(msg) { console.log(msg)},
		rules : options.rules ? options.rules : false,
		error_class : options.error_class ? options.error_class : 'is-error',
		valid_class : options.valid_class ? options.valid_class : 'is-valid',
		validHandler : options.validHandler && typeof options.validHandler == 'function' ? options.validHandler : function(el) {
			el.parentNode.classList.remove(options.error_class);
			el.parentNode.classList.add(options.valid_class);
		},
		errorHandler : options.errorHandler && typeof options.errorHandler == 'function'? options.errorHandler : function(el, message) {
			el.parentNode.classList.remove(options.valid_class);
			el.parentNode.classList.add(options.error_class);
			var error_message = el.parentNode.querySelector('.field-tooltip');
			if(error_message) error_message.innerHTML = message;
			else createElement('div', message, 'field-tooltip', null, el.parentNode);
		},
	}
	var self = this;
	this.options = options;
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Handler Functions
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	function isValid(el){
		self.options.validHandler(el);
	}
	
	function isError(el, message){
		self.options.errorHandler(el, message);
		self.message.errors ++;
		self.message.fields.push(message);
		
		el.addEventListener('input', validateField);
	}
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// If there is a form, init
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	if (form) {
				
		this.el = form;
		this.validate_fields = this.el.querySelectorAll('.validate');
		this.message = {
			errors : 0,
			fields : []
		};
		
		// My Privates
		var getRadioCheckedValue = function(form, radio_name){
		   var oRadio = form.els[radio_name];
		 
		   for(var i = 0; i < oRadio.length; i++)
		   {
		      if(oRadio[i].checked)
		      {
		         return oRadio[i].value;
		      }
		   }
		 
		   return '';
		}
		
		// Init
		
		for (i = 0; i < this.validate_fields.length; i++) {
			var el = this.validate_fields[i],
				method 	= el.getAttribute('data-validate'),
				errored = el.parentNode.classList.contains('is-error');
			if(errored) {
				el.addEventListener('change', validateField);
			}
		}
		
		form.addEventListener('submit', function(e){ e.preventDefault(); validateForm(e)});
	}
	
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Core Public Methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	this.validateForm = function(el) {
		if(el.target){
			el.preventDefault();
			el = el.target;
		}
		this.isValid = true;
		this.message.errors = 0;
		this.message.fields = [];
		for (i = 0; i < this.validate_fields.length; i++) {
			if (this.validateField(this.validate_fields[i])) {
				continue;
			}
			this.isValid = false;
		}
		if (this.isValid) {
			this.options.success(event);
		} else {
			if (form.querySelector('.is-error .field-element')) form.querySelector('.is-error .field-element').focus();
			this.options.fail(this.message);
		}
		return false;
	}
	
	this.validateField = function(el) {
		var el = el.target ? el.target : el,
			value = el.value;
			
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		// Check if element depends on another elements value or checkedness...
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		if(el.hasAttribute('validate-depends')) {
			var el_value;
			if(form.els[el.getAttribute('validate-depends')].type == 'radio') {
				el_value = getRadioCheckedValue(form, el.getAttribute('validate-depends'));
			}else{
				el_value = form.els[el.getAttribute('validate-depends')].value;
			}
			
			if(el.hasAttribute('validate-depends-value') && el_value !== el.getAttribute('validate-depends-value')) {
				el.parentNode.classList.remove('is-error');
				el.parentNode.classList.remove('is-valid');
				return true;
			}
			if(el_value == '') {
				el.parentNode.classList.remove('is-error');
				el.parentNode.classList.remove('is-valid');
				return true;
			}
		}
		
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		// Check max character length
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		if(el.hasAttribute('data-max')) {
			var max = Number(el.getAttribute('data-max'));
			if(max < value.length){
				isError(el);
				return false;
			}
		}
		
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		// Check min character length
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		if(el.hasAttribute('data-min')) {
			var min = Number(el.getAttribute('data-min'));
			if(min < value.length){
				isError(el);
				return false;
			}
		}
		
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		// Cache validation methods and messages
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		var methods		= el.getAttribute('validate'),
			message 	= el.getAttribute('validate-message'),
			parent_el	= el.parentNode,
			required	= el.hasAttribute('required'),
			valid		= true;
			
		methods = (required && !methods) ? ['required'] : methods.replace(/\s/g,'').split(',');
		required = !required ?  Array.prototype.indexOf('required', methods) : required;
		
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		// Iterate through the validation methods
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		
		if(required || !required && value.length > 0) {
			for (t = 0; t < methods.length; t++) { 
				if(methods[t] && typeof this.validateMethods[methods[t]].validate == 'function') {
					var valMethod = this.validateMethods[methods[t]];
					if (valMethod.validate(value, el)) {
						isValid(el);
					} else {
						isError(el, valMethod.message);
						valid = false;
						break;
					}
				}
			}
		}
		return valid;
	}
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Bind this to event driven methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	var validateForm = this.validateForm.bind(this),
		validateField = this.validateField.bind(this);
};

fras.Validator.prototype.addMethod = function(name, method, message) {
	fras.Validator.prototype.validateMethods[name] = {
		validate : method,
		message : message
	}
};

fras.Validator.prototype.validateMethods = { // private prop
	required: {
		validate : function(val, el) {
			if (val.length > 0) {
				return true;
			} else {
				return false;
			}
		},
		message : 'This field is required'
	},
	number : {
		validate : function(val, el) {
			var re = /^[0-9.]+$/
			var rslt = re.test(val);
			return rslt;
		},
		message : 'This field is required'
	},
	email: {
		validate : function(val, el) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			var rslt = re.test(val);
			return rslt;
		},
		message : 'Please input a valid email address'
	},
	checked: {
		validate : 
		function(val, el) {
			if (el.checked == true) {
				return true;
			} else {
				return false;
			}
		},
		message : 'This field is required'
	},
	phone: {
		validate : function(val, el) {
			var phone2 = /^(\+\d)*\s*(\(\d{3}\)\s*)*\d{3}(-{0,1}|\s{0,1})\d{2}(-{0,1}|\s{0,1})\d{2}$/;
			if (val.match(phone2)) {
				return true;
			} else {
				return false;
			}
		},
		message : 'This field is required'
	},
	fileExtension: {
		validate : function(val, el) {
			var alphaExp = /.*\.(gif)|(jpeg)|(jpg)|(png)$/;
			if (el.value.toLowerCase().match(alphaExp)) {
				return true;
			} else {
				return false;
			}
		},
		message : 'This field is required'
	},
	date: {
		validate : 
		function(val, el) {
			var format = "MMDDYYYY";
			if (format == null) {
				format = "MDY";
			}
			format = format.toUpperCase();
			if (format.length != 3) {
				format = "MDY";
			}
			if ((format.indexOf("M") == -1) || (format.indexOf("D") == -1) || (format.indexOf("Y") == -1)) {
				format = "MDY";
			}
			if (format.substring(0, 1) == "Y") { // If the year is first
				var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
				var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
			} else if (format.substring(1, 2) == "Y") { // If the year is second
				var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
				var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
			} else { // The year must be third
				var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
				var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
			}
			// If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
			if ((reg1.test(val) == false) && (reg2.test(val) == false)) {
				return false;
			}
			var parts = val.split(RegExp.$1); // Split into 3 parts based on what the divider was
			// Check to see if the 3 parts end up making a valid date
			if (format.substring(0, 1) == "M") {
				var mm = parts[0];
			} else
			if (format.substring(1, 2) == "M") {
				var mm = parts[1];
			} else {
				var mm = parts[2];
			}
			if (format.substring(0, 1) == "D") {
				var dd = parts[0];
			} else
			if (format.substring(1, 2) == "D") {
				var dd = parts[1];
			} else {
				var dd = parts[2];
			}
			if (format.substring(0, 1) == "Y") {
				var yy = parts[0];
			} else
			if (format.substring(1, 2) == "Y") {
				var yy = parts[1];
			} else {
				var yy = parts[2];
			}
			if (parseFloat(yy) <= 50) {
				yy = (parseFloat(yy) + 2000).toString();
			}
			if (parseFloat(yy) <= 99) {
				yy = (parseFloat(yy) + 1900).toString();
			}
			var dt = new Date(parseFloat(yy), parseFloat(mm) - 1, parseFloat(dd), 0, 0, 0, 0);
			if (parseFloat(dd) != dt.getDate()) {
				return false;
			}
			if (parseFloat(mm) - 1 != dt.getMonth()) {
				return false;
			}
			return true;
		},
		message : 'This field is required'
	},
	dob : {
		validate : function(val, el) {
				if(validateMethods.isDate(el)) {
					dob = new Date(val);
					today = new Date();
					today.setFullYear(today.getFullYear() - 5);
					return dob < today;
				}else {
					return false;
				}
		},
		message : 'This field is required'
	},
	name: {
		validate : function(val, el) {
			var re = /^[A-Za-z0-9 ]{3,50}$/;
			var rslt = re.test(val);
			return rslt;
		},
		message : 'This field is required'
	},
	password: {
		validate : function(val, el) {
			var re = /^(?=.*\d).{8,20}$/;
			var rslt = re.test(val);
			return rslt;
		},
		message : 'This field is required'
	},
	url: {
		validate : function(val, el) {
			var re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			var rslt = re.test(val);
			return rslt;
		},
		message : 'This field is required'
	},
	zip: {
		validate : function(val, el) {
			var re = /^\d{5}(?:[-\s]\d{4})?$/;
			var rslt = re.test(val);
			console.log(rslt)
			return rslt;
		},
		message : 'This field is required'
	},
	match: {
		validate : function(val, el) {
			var match = document.getElementById(el.getAttribute('validate-match-value')).value;
			
			if (val == match) {
				return true;
			}
			else {
				return false;
			}
		},
		message : 'This field is required'
	}
}
fras.components.dropUpload = function(selector, options) {
	// - - - - - - - - - - - - - - - - - - - - - - - -
	// Cache Fras utils
	// - - - - - - - - - - - - - - - - - - - - - - - -
	var utils = fras.utils;
	var dom = utils.dom;
	var createElement = dom.createElement;
	var addClass = dom.addClass;
	var removeClass = dom.removeClass;
	var forEach = dom.forEach;


	fras.listenerManager.bind([selector, imageDropZone]);

	options.type = options.type ? options.type : 'image';
	options.background = options.background ? options.background : false;

	// Main handler function
	function imageDropZone(element, index){
		inputEl = element.getElementsByClassName('upload');
		inputEl = inputEl[0];
		inputEl.addEventListener('change', handleImage, false);
		inputEl.addEventListener("dragover", FileDragHover, false);
		inputEl.addEventListener("dragleave", FileDragOut, false);
		inputEl.addEventListener("drop", FileDragOut, false);
	}


	function FileDragHover(event) {
		addClass(event.target.parentNode, 'image-over');
	}

	function FileDragOut(event) {
		removeClass(event.target.parentNode, 'image-over');
	}

	function handleImage(event) {
		var reader = new FileReader();
		reader.onload = function (e) {
			var previewImg = event.target.parentNode.getElementsByClassName('preview-img')[0]
			if(options.background) previewImg = event.target.parentNode;
			previewImg.setAttribute('style', 'background-image: url(' + e.target.result + ');');
			addClass(previewImg,'is-active');
		}
		reader.readAsDataURL(event.target.files[0]);
	}
}

fras.fn.fieldControl = function () {
    var $el = this;
    function isFilled(parent) {
        var filled = false;

        for(var i = 0; i < parent.childNodes.length; i ++) {
            var el = parent.childNodes[i];
            if(el.value) {
                filled = true;
                break;
            }
        }
        console.log(filled);
        return filled;
    }
    $el.each(function(el, index){
        var $parent = fras.$(el);
        var $fieldElement = $parent.find('input');

        $fieldElement.on('focus', fieldControlFocus);
        $fieldElement.on('blur', fieldControlBlur);
        $fieldElement.on('input', fieldControlInput);

        //On Focus
        function fieldControlFocus(event) {
            var parent = fras.$(event.target).parent($el.selector);
            parent.addClass('focused');
        }

        //On Blur
        function fieldControlBlur(event) {
            var parent = fras.$(event.target).parent($el.selector);
            var filled = isFilled(event.target.parentNode);

            parent.removeClass('focused');

            if (filled) {
                parent.addClass('filled');
            } else {
                parent.removeClass('filled');
            }
        }

        //On input
        function fieldControlInput(event) {
            var parent = fras.$(event.target).parent($el.selector);
            var filled = isFilled(event.target.parentNode);

            parent.removeClass('focused');

            if (filled) {
                parent.addClass('filled');
            } else {
                parent.removeClass('filled');
            }
        }
    });

    return $el;
};

fras.fn.rangeSlider = function () {
    var $el = this;
    this.each(function(el, index) {
        var elTooltip = document.getElementById(el.getAttribute('data-tooltip')),
        elVal = el.value,
        minVal = Number(el.getAttribute('min')),
        maxVal = Number(el.getAttribute('max'));

        if (elTooltip) {
            var outputW = elTooltip.offsetWidth,
            outputPos = (elVal - minVal) / (maxVal - minVal);
            // Set these
            elTooltip.innerHTML = elVal;
            elTooltip.style.left = outputPos * 100 + '%';
            elTooltip.style.marginLeft = (outputW / 2) * -outputPos + 'px';
        }

        // Input changed
        $el.on('input', sliderControlInput);
        // Mousdown
        $el.on('mousedown', sliderControlMousedown);
        // Mouesup
        $el.on('mouseup', sliderControlMouseup);
    });
    function sliderControlInput(event) {
        // Get the shit
        var range_marker = document.getElementById(event.target.getAttribute('data-marker'));
        var elTooltip = document.getElementById(event.target.getAttribute('data-tooltip'));
        var elVal = event.target.value,
            minVal = Number(event.target.getAttribute('min')),
            maxVal = Number(event.target.getAttribute('max')),
            outputPos = (elVal - minVal) / (maxVal - minVal);

        if (range_marker) range_marker.innerHTML = elVal;

        if(elTooltip) {
            var outputW = elTooltip.offsetWidth;
            elTooltip.innerHTML = elVal;
            elTooltip.style.left = outputPos * 100 + '%';
            elTooltip.style.marginLeft = outputW * -outputPos + 'px';
        }

    }

    function sliderControlMousedown(event) {
        var elVal = event.target.value,
        elTooltip = document.getElementById(event.target.getAttribute('data-tooltip')),
        minVal = Number(event.target.getAttribute('min')),
        maxVal = Number(event.target.getAttribute('max')),
        outputPos = (elVal - minVal) / (maxVal - minVal);

        if(elTooltip) {
            var outputW = elTooltip.offsetWidth;
            elTooltip.innerHTML = elVal;
            elTooltip.style.left = outputPos * 100 + '%';
            elTooltip.style.marginLeft = outputW * -outputPos + 'px';
            addClass(elTooltip.parentNode, 'is-active');
            addClass(elTooltip.parentNode, 'is-set');
        }
    }

    function sliderControlMouseup(event) {
        var elTooltip = document.getElementById(event.target.getAttribute('data-tooltip'));
        if(elTooltip) {
            elTooltip.parentNode.classList.remove('is-active');
            elTooltip.parentNode.classList.remove('is-set');
        }
    }
};

/*	======================================

		Accordion

		@param 	selector : css selector for accordions
		@param 	options {
					multiple : boolean (whether to allow multiple elements open or not, default false)
				}

========================================== */

fras.modules.Accordion = function (selector, options) {
    var defaults = {
        multiple: false,
        scroll: false
    }

    if (typeof options == 'object') {
        options.multiple = options.multiple ? options.multiple : defaults.multiple;
        options.scroll = options.scroll ? options.scroll : defaults.scroll;
    } else {
        options = defaults;
    }
    this.options = options;

    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache fras
    // - - - - - - - - - - - - - - - - - - - - - - - -

    var addClass = fras.utils.dom.addClass,
        removeClass = fras.utils.dom.addClass,
        forEach = fras.utils.dom.forEach,
        listenerManager = fras.listenerManager,

        // - - - - - - - - - - - - - - - - - - - - - - - -
        // Cache prototype functions and bind this
        // - - - - - - - - - - - - - - - - - - - - - - - -

        toggle = this.toggle.bind(this),
        update = this.update.bind(this);

    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Bind events
    // - - - - - - - - - - - - - - - - - - - - - - - -

    this.els = Array.prototype.slice.call(document.querySelectorAll(selector));

    this.els.forEach(function (el) {
        listenerManager.bind([Array.prototype.slice.call(el.querySelectorAll('.accordion-trigger')), function (el) {
            el.addEventListener('click', toggle)
        }]);
    });

    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Init
    // - - - - - - - - - - - - - - - - - - - - - - - -

    update();
    window.addEventListener('resize', update);

}

fras.modules.Accordion.prototype.toggle = function (event) {

    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache fras
    // - - - - - - - - - - - - - - - - - - - - - - - -

    var addClass = fras.utils.dom.addClass,
        removeClass = fras.utils.dom.addClass,
        forEach = fras.utils.dom.forEach,
        listenerManager = fras.listenerManager,

        // - - - - - - - - - - - - - - - - - - - - - - - -
        // Cache elements
        // - - - - - - - - - - - - - - - - - - - - - - - -

        parent = event.currentTarget.parentNode,
        accordion_container = parent.parentNode;
    accordion_content = accordion_container.querySelectorAll('.accordion-content');

    if (!this.options.multiple) {
        fras.$(accordion_content).each(function (el) {
            fras.utils.dom.addClass(el, 'collapsed');
            fras.utils.dom.removeClass(el, 'expanded');
            fras.utils.dom.removeClass(el.parentNode, 'is-active');
            el.style.height = '0';
        });
    }

    var content = parent.querySelector('.accordion-content'),
        height = content.scrollHeight;

    if (content.offsetHeight < 1 && !fras.$(content).hasClass('expanded')) {
        content.style.height = height + 'px';
        fras.utils.dom.removeClass(content, 'collapsed');
        fras.utils.dom.addClass(content, 'expanded');
        fras.utils.dom.addClass(parent, 'is-active');
        if (this.options.scroll) {
            this.last_scroll = window.pageYOffset || document.documentElement.scrollTop;
        }
    } else {
        content.style.height = '0';
        fras.utils.dom.addClass(content, 'collapsed');
        fras.utils.dom.removeClass(content, 'expanded');
        fras.utils.dom.removeClass(parent, 'is-active');
        if (this.options.scroll) {
            var offset = fras.utils.dom.cumulativeOffset(parent);
            fras.animate.scrollTo(this.last_scroll, 200);
        }
    }
};

fras.modules.Accordion.prototype.update = function () {

    fras.utils.dom.forEach(this.els, function (el) {
        fras.utils.dom.forEach(el.querySelectorAll('.is-active .accordion-content'), function (el) {
            el.style.transition = 'none';
            el.style.height = '';
            var height = el.scrollHeight;
            el.style.height = height + 'px';
            el.style.transition = '';
        });
    });
}

//- //////////////////////////////////////////////////

//- // Color Scroll Animation

//- //////////////////////////////////////////////////

fras.modules.AnimateColor = function AnimateColor(selector, options) {
	
	options = options ? options : {};

	options.animationRatio = options.animationRatio ? options.animationRatio : 1;
	options.threshhold = options.threshhold ? options.threshhold : 200;
	
	var winH = window.innerHeight,
		processed = false,
		elements = document.querySelectorAll(selector),
		last_scroll = 0;
	
	this.els = [];
	
	function init(){
		this.els = [];
		for(i=0; i < elements.length; i++){
			var el = elements[i];
			el.style.backgroundColor = '';
			var top = fras.utils.dom.cumulativeOffset(el).top,
				center = top + el.offsetHeight/2,
				bg_color = getComputedStyle(el).getPropertyValue("background-color");
				var rgba =  bg_color.split("(")[1].split(")")[0].split(","),
				hsla = rgbaToHsla(rgba[0], rgba[1], rgba[2], rgba[3]);
			var obj = {
				el : el,
				top : top,
				bottom : top + el.offsetHeight,
				center : center,
				height : el.offsetHeight,
				hsla : hsla,
				threshhold : el.getAttribute('data-threshhold') ? Number(el.getAttribute('data-threshhold')) : options.threshhold
			}
			this.els.push(obj);
		};
		processed = true;
	}
	
	function animateColor() {
		var scrollY = window.pageYOffset || document.documentElement.scrollTop;
		if(!processed) init();
		for (i = 0; i < this.els.length; i++) {
			var el = this.els[i];
			if(scrollY > el.top - winH && scrollY < el.bottom){
				var center_win = scrollY + winH/2,
					start_mod = el.top - winH,
					current_time = scrollY - start_mod,
					start = 0,
					to = 1,
					duration =  winH/2 + el.height/2 - el.threshhold/2,
					dif = duration - current_time;
					
					if(dif < 0 && dif > - el.threshhold) {
						current_time = current_time + dif;
					}else if(dif < - el.threshhold) {
						current_time = current_time - duration - el.threshhold;
						start = 1;
						to = 2;
					}
				var change = Math.linearTween(current_time, start, to, duration);
					
				var h_offset = options.hue ? options.hue - (options.hue * change) : 0,
					s_offset = options.saturation ? options.saturation - (options.saturation * change) : 0,
					l_offset = options.lightness ? options.lightness - (options.lightness * change) : -el.hsla[2] - (-el.hsla[2] * change);
					
				var	H = el.hsla[0] + h_offset,
					S = el.hsla[1] + s_offset,
					L = el.hsla[2] + l_offset,
					A = el.hsla[3],
					dynamic_hsla = "hsla(" + H +", " + S + "%, " + L + "%, " + A + ")";
				el.el.style.backgroundColor = dynamic_hsla;
				if(typeof options.callback == 'function') options.callback(el.el, change);
				if(typeof options.in == 'function' && change <= 1) options.in(el.el, change);
				else if(typeof options.out == 'function' && change > 1) options.out(el.el, change - 1);
				
			}
		}
	}
	
	var animateColor = animateColor.bind(this);
	var init = init.bind(this);
	
	// RGBA To HSLA Color Conversion
	
	function rgbaToHsla(r, g, b, a){
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		h = h * 360;
		s = s * 100;
		l = l * 100;
		if (a === undefined) {
			var a = 1;
		}
		return [h, s, l, a];
	};
	
	window.addEventListener('optimizedScroll', animateColor);
	window.addEventListener('optimizedResize', init);
	
};
//- //////////////////////////////////////////////////

//- // Header Scroll Animation

//- //////////////////////////////////////////////////

fras.modules.AnimateHeader = function AnimateHeader(id, options) {
	options = options ? options : {};

	if (options.scrollDownThreshold === undefined) {
		options.scrollDownThreshold = 0;
	}

	if (options.scrollUpThreshold === undefined) {
		options.scrollUpThreshold = 0;
	}
	
	if (options.scrollSpeed === undefined) {
		options.scrollSpeed = 1;
	}

	header = document.getElementById(id);
	
	if(!header) return null;
	
	var headerHeight = header.offsetHeight;
	var negHeaderHeight = (headerHeight * -1);
	
	fras.trackers.header_transform = headerHeight + thisTransform;
	
	var lastTransform = 0;
	var thisTransform = 0;
	var lastScrollY = 0;
	var scrollUpThreshold = options.scrollUpThreshold;
	var scrollDownThreshold = options.scrollDownThreshold;
	var scrollSpeed = options.scrollSpeed;
	var scrollUpTicker = [];
	var tickerSum = 0;

	// Scroll Animation

	function animateHeader() {
		var scrollY = window.pageYOffset || document.documentElement.scrollTop;
		scrollDistance = (lastScrollY - scrollY);
		scrollingUp = (scrollDistance > 0);
		scrollingDown = (scrollDistance < 0);
		if(scrollY <= 0){
			header.style.transform = 'translateY(0)';
			header.style.msTransform = 'translateY(0)';
		}else if (scrollingDown) {
			if (scrollY >= (scrollDownThreshold - (headerHeight / scrollSpeed))) {
				if(scrollDistance > 5) scrollDistance = 10;
				thisTransform = (scrollDistance * scrollSpeed) + lastTransform;
				thisTransform = Math.round(thisTransform >= negHeaderHeight ? thisTransform : negHeaderHeight);
				header.style.transform = 'translateY(' + thisTransform + 'px)';
				header.style.msTransform = 'translateY(' + thisTransform + 'px)';
			}
			if (thisTransform <= (negHeaderHeight + 1)) {
				scrollUpTicker = [0];
			}

		} else if (scrollingUp) {
			scrollUpTicker.push(scrollDistance);
			for (i = 0; i < scrollUpTicker.length; i++) {
				tickerSum += scrollUpTicker[i];
			}
			if ((lastTransform + (scrollDistance * scrollSpeed)) >= 0) {
				thisTransform = 0;
				header.style.transform = 'translateY(' + 0 + 'px)';
				header.style.msTransform = 'translateY(' + 0 + 'px)';
			} else if (tickerSum >= scrollUpThreshold || scrollY <= scrollDownThreshold || scrollY <= (headerHeight / scrollSpeed)) {
				thisTransform = Math.round(lastTransform + (scrollDistance * scrollSpeed));
				header.style.transform = 'translateY(' + thisTransform + 'px)';
				header.style.msTransform = 'translateY(' + thisTransform + 'px)';
			}
		};

		lastScrollY = scrollY;
		lastTransform = thisTransform;
		fras.trackers.header_transform = headerHeight + thisTransform;
		tickerSum = 0;
	};

	// Instantiate

	var last_known_scroll_position = 0;
	var ticking = false;

	window.addEventListener('scroll', animateHeader);
};
fras.modules.Editabler = function(el){
	var self = this,
		utils = fras.utils;
	this.el = document.getElementById(el);
	this.parent = this.el.parentNode;
	
	this.el.addEventListener('focus', function(event){
		utils.dom.addClass(self.parent, 'is-active');
	});
	
	this.el.addEventListener('blur', function(event){
		self.parent.classList.remove('is-active');
	});
	
	function createEditPanel() {
		var tools = [
			{
				title : 'H1',
				el : document.createElement('li'),
				tag : 'h1',
				type : 'block'
			},
			{
				title : 'H2',
				el : document.createElement('li'),
				tag : 'h2',
				type : 'block'
			},
			{
				title : 'H3',
				el : document.createElement('li'),
				tag : 'h3',
				type : 'block'
			},
			{
				title : 'H4',
				el : document.createElement('li'),
				tag : 'h4',
				type : 'block'
			},
			{
				title : 'P',
				el : document.createElement('li'),
				tag : 'p',
				type : 'block'
			},
			{
				title : 'UL',
				el : document.createElement('li'),
				tag : 'insertUnorderedList',
				type : 'command'
			},
			{
				title : 'Clear Formatting',
				el : document.createElement('li'),
				tag : 'removeFormat',
				type : 'command'
			}
		]
		var toolbar_wrapper = document.createElement('div');
		var edit_toolbar = document.createElement('ul');
		edit_toolbar.classList.add('edit-toolbar');
		toolbar_wrapper.classList.add('edit-toolbar-wrapper');
		toolbar_wrapper.appendChild(edit_toolbar);
		
		tools.forEach(function(tool){
			tool.el.innerHTML = tool.title;
			tool.el.setAttribute('data-tag', tool.tag);
			tool.el.setAttribute('data-type', tool.type);
			tool.el.addEventListener('mousedown', addTag);
			edit_toolbar.appendChild(tool.el);
		}); 
		self.parent.insertBefore(toolbar_wrapper, self.el);
		
		return edit_toolbar;
	}
	
	var edit_toolbar = createEditPanel();
	document.execCommand('styleWithCSS', true);
	function addTag(event){
		event.preventDefault();
		var tag = event.currentTarget.getAttribute('data-tag');
		var type = event.currentTarget.getAttribute('data-type');
    
		switch(type) {
			case 'block' :
				document.execCommand('formatBlock', false, tag);
				document.execCommand('removeFormat', false, null);
			break;
			case 'inline' :
			break;
			case 'command' :
				document.execCommand(tag, false, '');
				document.execCommand('removeFormat', false, null);
			break;
		}
	}
	
	document.addEventListener('optimizedScroll', alignEditToolbar);
	
	function alignEditToolbar(event) {
		var item_offset = utils.dom.cumulativeOffset(self.el);
		var scroll_pos = document.documentElement.scrollTop || document.body.scrollTop;
		if(item_offset.top < scroll_pos + edit_toolbar.offsetHeight) {
			edit_toolbar.style.width = edit_toolbar.offsetWidth + 'px';
			edit_toolbar.style.position = 'fixed';
		}
		else {
			edit_toolbar.style.position = 'relative';
		}
	}
}

fras.modules.GalleryUpload = function(el, options) {
	
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	// Cache GW utils
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	var utils = fras.utils;
	var dom = utils.dom;
	var createElement = dom.createElement;
	var addClass = dom.addClass;
	var removeClass = dom.removeClass;
	var forEach = dom.forEach;
	
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	// Init properties
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	
	var self = this;
	this.options = {
		item_class : options.item_class ? options.item_class : 'drag-img-item',
		upload_name : options.upload_name ? options.upload_name : 'file_upload',
		detail_name : options.detail_name ? options.detail_name : 'title',
		detail_label : options.detail_label ? options.detail_label : 'Title',
	}
	
	this.el = document.getElementById(el);
	this.input = [this.el.querySelector('input')];
	this.files = [];
	this.count = 0;
	self.imageDropZone();
}

fras.modules.GalleryUpload.prototype.addFile = function(){
	
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	// Cache GW utils
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	var createElement = fras.utils.dom.createElement;
	
	this.count ++;
	var count = this.count
	var input = this.input[count] = createElement('input', '', 'gallery-upload-file', [{name : 'name', value : this.options.upload_name + '[]'}, {name : 'type', value : 'file'}]);
	input.style.display = 'none';
	this.el.insertBefore(this.input[this.count], this.input[this.count - 1]);
	this.imageDropZone();
	return  this.input[Number(this.count - 1)];
}

// Upload drag and drop functions
fras.modules.GalleryUpload.prototype.imageDropZone = function(){
	
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	// Cache GW utils
	// - - - - - - - - - - - - - - - - - - - - - - - - 
	var utils = fras.utils;
	var dom = utils.dom;
	var createElement = dom.createElement;
	var addClass = dom.addClass;
	var removeClass = dom.removeClass;
	var forEach = dom.forEach;
	
	var self = this;
	inputEl = self.input[self.count];
	inputEl.addEventListener('change', handleImage, false);
	inputEl.addEventListener("dragleave", FileDragOut, false);
	inputEl.addEventListener("drop", FileDragOut, false);
	this.el.addEventListener('dragenter', FileDragHover, false);
		
	function FileDragHover(event) {
		addClass(self.el, 'image-over');
	}
	
	function FileDragOut(event) {
		removeClass(self.el, 'image-over');
	}
	
	function handleImage(event) {
		var reader = new FileReader();
		var files = event.target.files;
		reader.onload = function (e) {	        
	    	//Create
	    	var preview_img = event.target.parentNode,
	    		upload_item = createElement('div',  null, 'gallery-item ' + self.options.item_class),
	    		checkbox = createElement('input',  null, 'remove-upload-item', [{name :'type', value : 'checkbox'}, {name : 'value', value : 'nosave'}]),
	    		detailinput = createElement('div', null, 'add-detail'),
	    		img = document.createElement('img');
	    	
	    	//Define
	    	img.setAttribute('src', e.target.result);
	    	
	    	//Append
	    	upload_item.appendChild(checkbox);
	    	upload_item.appendChild(img);
	    	upload_item.appendChild(detailinput);
	    	preview_img.appendChild(upload_item);
	    	detailinput.innerHTML = '<input type="text" name="'+ self.options.detail_name +'[]" placeholder="'+ self.options.detail_label +'"><i class="icon"></i>';
	    	
	    	var file_input = self.addFile();
	    	
	    	// Events
	    	checkbox.addEventListener('click', function(event){
		    	if(event.target.checked == true) {
			    	file_input.disabled = true;
			    	upload_item.setAttribute('data-nosave', true);
		    	}else {
			    	file_input.disabled = false;
			    	upload_item.removeAttribute('data-nosave');
		    	}
	    	});
		}
		reader.readAsDataURL(event.target.files[0]);
	}
}
/* ===========================================
		
		Go to Section
		
=============================================*/

fras.modules.GoToSection = function(selector, options){
	var options = {
			container : (options.container ? options.container : document.documentElement || document.body),
			scrolljack : false,
			animate : false, // darken, lighten, custom function
			speed : 1000
		},
		self = this,
		state = -1,
		break_scroll = false,
		click_scroll = false,
		delta 			= 0,
		last_scroll = 0,
		last_delta = 0,
		last_delta_dist = 0,
		scroll_jack = false,
		killTimer = [],
		hideTimer,
		scrollTimer,
		dom = fras.utils.dom;
	
	var selector = selector ? selector : '[data-title]';
	
	function scrollTo(tada, to, duration, callback) {
			break_scroll=false;
			clearTimeout(scrollTimer);
	    var start = options.container.scrollTop;
	        change = to - start,
	        currentTime = 0,
	        increment = 20;
	        
	    var animateScroll = function(){        
	        currentTime += increment;
	        var val = Math.easeInOutCirc(currentTime, start, change, duration);
	        options.container.scrollTop = val;
	        if(currentTime < duration && break_scroll==false) {
	            scrollTimer = setTimeout(animateScroll, increment);
	        }
	        else{
		        if (callback) callback();
	        }
	    };
	    animateScroll();
	}
	
	function createTriggers(els) {
		var trigger_array = new Array();
		forEach(els, function(el, index){
			var eloffsetTop = dom.cumulativeOffset(el),
					el_title = el.getAttribute('data-title');
			trigger_array.push({top: eloffsetTop.top, height: el.offsetHeight, title: el_title});
		});
		return trigger_array
	}
	
	function createDots(els){
		var trigger_array = new Array();
		forEach(els, function(el, index){
			var eloffsetTop = dom.cumulativeOffset(el),
				el_title = el.getAttribute('data-title');
			trigger_array.push({top: eloffsetTop.top, height: el.offsetHeight, title: el_title});
			self.list_items[index] = document.createElement('li');
			self.list_items[index].innerHTML = '<a href="#' + el.getAttribute('id') + '"></a><span class="tooltip">'+ el_title +'<span>';
			
			self.list_items[index].addEventListener('click', function(event){
				event.preventDefault();
				var target = event.currentTarget.querySelector('a').getAttribute('href');
				target = document.querySelector(target);
				var offset = dom.cumulativeOffset(target);
				var headerHeight = document.querySelector('.js-header');
				click_scroll = true;
				scrollTo(options.container, offset.top - headerHeight.offsetHeight, 500, function(){
					click_scroll = false;
				});
			});
			
			self.list_items[index].addEventListener('mouseover', function(event){
				dom.removeClass(self.last_item, 'show-title');
			});
			
			self.nav_ul.appendChild(self.list_items[index]);
		});
		if(trigger_array.length > 0) {
			options.container.appendChild(self.nav);
		}
		
		return trigger_array;
	};
	
	// Public
	this.nav = document.createElement('div');
	dom.addClass(this.nav, 'dot-nav');
	this.nav_ul = document.createElement('ul');
	this.nav.appendChild(this.nav_ul);
	this.list_items = [];
	this.last_item = false;
	this.winH = window.innerHeight;
	this.sections = document.querySelectorAll(selector);
	this.triggers = createDots(this.sections);
	
	this.next = function(){
		if(state < self.triggers.length - 1) {
			state ++;
			click_scroll = true;
			scrollTo(options.container, self.triggers[state][0], 500, function(){
				click_scroll = false;
			});
		}else {
			state = self.triggers.length;
			scroll_jack = false;
		}
	};
	
	this.prev = function(){
		if(state > 0) {
			state --;
			click_scroll = true;
			scrollTo(options.container, self.triggers[state][0], 500, function(){
				click_scroll = false;
			});
		}
		else {
			state = -1;
			scroll_jack = false;
		}
	};
		
	function init(){
		options.container.addEventListener('optimizedScroll', function(event){
			var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
			if(scrollPos > self.winH/6) {
				dom.addClass(self.nav, 'is-open');
			}
			else {
				dom.removeClass(self.nav, 'is-open');
				if(self.last_item) {
					dom.removeClass(self.last_item, 'is-active');
				}
			}
			
			clearTimeout(hideTimer);
			
			hideTimer = window.setTimeout(function(){
				dom.removeClass(self.nav, 'is-open');
			}, 1610);
			
			self.triggers.forEach(function(el, index){
				if(scrollPos > el[0] - (self.winH/2) && scrollPos < el[0] + (self.winH/2)){
					if(state == -1 && index == 0 && delta < 0){
						last_delta =0;
						scroll_jack = true;
					}else if (self.last_item !== self.list_items[index]) {
						scroll_jack = true;
						clearTimeout(killTimer[index]);
						if (self.last_item){ 
							dom.removeClass(self.last_item, 'is-active');
						}
						
						dom.addClass(self.list_items[index], 'is-active');

						self.last_item = self.list_items[index];
						state = index;
					}
				}
			});
		});
		
		if (options.scrolljack) {
			options.container.addEventListener("wheel", MouseWheelHandler, false);
		}
		options.container.addEventListener("keydown", keydownHandler);
		window.addEventListener("optimizedResize", resize);

		
		function MouseWheelHandler(event) {
			delta = Math.max(-1, Math.min(1, -event.deltaY));
			if(event.deltaY !== 0 && scroll_jack == true){
				event.preventDefault();
				
				if(Math.abs(event.deltaX) < 2 ) {
									
					if(last_scroll !== delta && click_scroll == true && last_scroll !== 0) {
						break_scroll = true;
					}
					
					if(click_scroll === false &&  Math.abs(event.deltaY) - last_delta > 0) {
						if (delta > 0) {
							self.prev();
						}
						else {
							self.next();
						}
					}
					
					last_scroll = delta;
					last_delta_dist = Math.abs(event.deltaY)-last_delta;
					last_delta = Math.abs(event.deltaY);
				}
			}
		}
			
		function keydownHandler(event){	
	    if (event.keyCode == '38') {
		    break_scroll = true;
		    event.preventDefault();
		    self.prev();
	    }
	    else if (event.keyCode == '40') {
		    break_scroll = true;
	      event.preventDefault();
	      self.next();
	    }
		}
		
		function resize(){
			self.triggers = createTriggers(self.sections);
			self.winH = window.innerHeight;
		}		
	}
	
	if(this.triggers.length > 0) init();
}

/*	======================================

		Loader Constructor

========================================== */


fras.modules.loader = (function(){
	// private
	var utils = fras.utils,
	module = {
		loading : false,
		el : false,
		open : function(append_el, options) {
			var append_el = append_el ? append_el : document.body;
			if(!this.el) {
				this.el = utils.createElement('div', 'pinner-loader', null, append_el);
				loader.style.marginLeft = (-(loader.offsetWidth/2) + 'px');
				loader.style.marginTop = (-(loader.offsetHeight/2) + 'px');
				addClass(body, 'loading');
			}
		},
		close : function() {// Closes the loader
			this.loading = false;
			addClass(loader, 'close');
			removeClass(body, 'loading');
			if(this.el)	killElement(this.el, fras.options.animation_time);
		}
	};
	return module;
})();
/* ===========================================

		Modal Panel

=============================================*/

fras.modules.modal = (function() {
	// locals
	
	var module = {};
	
	module.locals = {
			modal : {}, // Panel Node
			dialog : {}, // Dialog Node
			slat : {
				container : false,
				messages : []
			},
			panel : {
				el : false,
				options : {},
			},
			toast : {
				container : false,
				messages : []
			},
			open : false, // Is Panel Open
			dialog_open : false,
			toast_open : false
		}
		
	module.options = {
		close_btn_content : '<i class="icon-close"></i>',
		content_container_class : 'modal-content',
		animation_time : 300
	};
	
	// Cache
	
	var options = module.options;
	var locals = module.locals;
	var utils = fras.utils;
	
	/* --------------------------------------------------
		
		Helper Functions
	
	-------------------------------------------------- */
	
	// Remove element from dom after set time
	module.killElement = function(element, done) {
		utils.dom.removeClass(element, 'is-open');
		setTimeout(function(){
			element.parentNode.removeChild(element);
			element = false;
			if(typeof done == 'function') done();
		}, options.animation_time);
	}
	
	// Create Modal elements
	module.createModal = function(class_stack) {
		// Create modal
		class_stack = class_stack ? 'modal ' + class_stack : 'modal';
		module.locals.modal.container = utils.dom.createElement('div', '', class_stack);
		
		// Add close btn
		var closebtn = utils.dom.createElement('button', '', 'modal-close modal-btn');
		closebtn.addEventListener('click', function(event){
			module.closeModal();
		});
			
		// Add content container
		module.locals.modal.content = utils.dom.createElement('div', '', options.content_container_class);
		module.locals.modal.container.appendChild(closebtn);
		module.locals.modal.container.appendChild(module.locals.modal.content);
		module.locals.modal.slides = [];
		// Add modal to dom
		document.body.appendChild(module.locals.modal.container);
	}
	
	/* --------------------------------------------------
		
		Modal
	
	-------------------------------------------------- */
	
	module.open = function(content, options, done) {
		// Set Default Options
		var defaults = {
			style : 'default',
			position :'bottom',
			overlay : true,
			width : 'auto',
			height : 'auto',
		}
			
		if(typeof options == 'object') {
			options.style = options.style ? options.style : defaults.style;
			options.position = options.position ? options.position : defaults.position;
			options.width = options.width ? options.width : defaults.width;
			options.height = options.height ? options.height : defaults.height;
		}else {
			options = defaults;
		}
		if(!module.locals.modal.container || !options.slide) {
			if(!module.locals.modal.container) {
				module.createModal(options.style + ' ' + options.position);
				module.locals.modal.container.style.width = options.width;
				module.locals.modal.container.style.height = options.height;
				module.locals.modal.slides = [utils.dom.appendElement('div', content, 'modal-slide', module.locals.modal.content)];
			}else {
				module.locals.modal.slides[0].innerHTML = content;
			}
			
			if(options.overlay) {
				utils.dom.addClass(document.body, 'is-overlay');
			}
			utils.dom.addClass(document.body, 'modal-open');
			
			// Finally show modal
			window.setTimeout(function(){
				if(typeof done == 'function') done();
				utils.dom.addClass(module.locals.modal.container, 'is-open');
			}, 10);
		}else {
			module.loadSlide(content, done);
		}
	}
	
	module.loadContent = function(url, options) {
		var defaults = {
			height : '400px'
		}
		if(typeof options == 'object'){
			options.height = options.height ? options.height : defaults.height;
		}else {
			options = defaults;
		}
		module.open('', options);
		utils.dom.addClass(module.locals.modal.container, 'loading');
		fras.ajax.post({
			url: url,
			success: function(res){
			utils.dom.removeClass(module.locals.modal.container, 'loading');
				module.locals.modal.slides[module.locals.modal.slides.length - 1].innerHTML = res;
				var h = module.locals.modal.slides[module.locals.modal.slides.length - 1].offsetHeight;
				var w = module.locals.modal.slides[module.locals.modal.slides.length - 1].offsetWidth;
				module.locals.modal.container.style.width = w + 'px';
				module.locals.modal.container.style.height = h + 'px';
			},
			err : function(err){
				module.toast(err, 3000);
			}
		});
	}
	
	module.loadSlide = function(content, done) {
		var slide = module.locals.modal.slides.length;
		// If no slides have yet been enabled
		if(slide == 1) {
			// Set static width
			var back_btn = utils.dom.createElement('button', '', 'modal-prev modal-btn');
			var w = module.locals.modal.container.offsetWidth;
			
			module.locals.modal.container.appendChild(back_btn);
			back_btn.addEventListener('click', module.prev);
			
			module.locals.modal.container.style.width = w + 'px';
			
			module.locals.modal.container
			// Enable slider class styles for modal
			utils.dom.addClass(module.locals.modal.content, 'is-slider');
		}
		module.locals.modal.slides[slide] = utils.dom.appendElement('div', content, 'modal-slide slide-' + slide, module.locals.modal.content);
		module.slide(slide, done);
	};

	module.slide = function(slide, done) {//Record history
		module.locals.modal.container.setAttribute('data-slide', slide);
		var w = module.locals.modal.container.offsetWidth;
		module.locals.modal.content.style.transform = 'translateX(-' + w * slide + 'px)';
		setTimeout(function(){
			if(typeof done == 'function') done();
		}, locals.animation_time);
	};
	
	module.next = function(done){
		var slide = Number(module.locals.modal.container.getAttribute('data-slide')) + 1;
		
		if(slide < module.locals.modal.slides.length) {
			module.slide(slide, done);
		}
	}
	
	module.prev = function(done){
		var slide = Number(module.locals.modal.container.getAttribute('data-slide')) -1;
		console.log(slide);
		if(slide >= 0) {
			module.slide(slide, done);
		}
	}
	
	// Closes panel and removes content
	module.closeModal = function(element) {
		utils.dom.removeClass(document.body, 'modal-open');	
		utils.dom.removeClass(document.body, 'is-overlay');
		utils.dom.removeClass(module.locals.modal.container, 'is-open');
		
		utils.dom.killElement(module.locals.modal.container, 300, false, function(){
			module.locals.modal.container = false;
		});
	};
	
	/* --------------------------------------------------
		
		Dialog Box
		
		dialog(content, options)
		
		@param 	content : @string
		@param 	options {
				title :
				buttons : [{
					title : @string,
					handler :  @function
				}]
				fields : [{
					type : @string ['text' | 'select'],
					label : @string,
					handler : {
						type : @string [any event listener type],
						action : @function
					},
					options : [ //Only applies to select types
						{
							label : @string,
							value : @string
						}
					]
				}],
				submit : @function
			}
	-------------------------------------------------- */

	module.dialog = function(content, options, done){
		clearTimeout(locals.closeTimer);
		
		// Default Options
		var defaults = {
			title : false,
			buttons : [{
				title : 'Ok',
				handler : function (){
					module.closeDialog();
				}
			}],
			fields : false
		}
		
		if(typeof options == 'function') { 
			done = options;
			options = defaults;
		}
		else if(typeof options == 'object') {
			options.title = options.title ? options.title : defaults.title;
			options.buttons = options.buttons ? options.buttons : defaults.buttons;
			options.fields = options.fields ? options.fields : defaults.fields;
			
		}else {
			options = defaults;
		}
		
		// Init Dialog
		locals.dialog = utils.dom.createElement('div','',  'dialog')
		document.body.appendChild(locals.dialog);
		
		// Title
		if(options.title) {
			var message = utils.dom.createElement('div', '', 'title');
			message.innerHTML = options.title;
			locals.dialog.appendChild(message);
		}
		
		// Content
		if(content) {
			var content_el = utils.dom.createElement('div', '',  'message');
			content_el.innerHTML = content;
			locals.dialog.appendChild(content_el);
		}
		
		// Add fields, if any
		if(options.fields) {
			var fields = utils.dom.createElement('form','', 'dialog-fields');		
			
			options.fields.forEach(function(element, i){
				switch(element.type) {
					case 'text' :
						var field = utils.dom.createElement('input', '', 'field-element', [{name : 'type', value : 'text'}, {name : 'name', value : element.name}, {name : 'placeholder', value : element.label}]);
					break;
					case 'select':
						var field = utils.dom.createElement('select', '', 'field-element', [{name : 'name', value : element.name}]);
						var options = '<option value="">' + element.label + '</option>';
						element.options.forEach(function(option, index){
							options += '<option value="'+ option.value +'">'+ option.label +'</option>';
						});
						field.innerHTML = options;
					break;
				} 
				
				element.el = field;
				
				if(typeof field.handler == 'object') field.addEventListener(field.handler.type, field.handler.action);
				fields.appendChild(field);
			});
			if(typeof options.submit == 'function') fields.addEventListener('submit', options.submit);
			locals.dialog.appendChild(fields);
		}
		
		// Add buttons, if any
		if(options.buttons) {
			var buttons = utils.dom.createElement('div', '', 'dialog-buttons');
			
			options.buttons.forEach(function(element, i){
				var button = utils.dom.createElement('button');
				button.innerHTML = element.title;
				button.addEventListener('click', element.handler);
				buttons.appendChild(button);
			});
			if(fields) fields.appendChild(buttons);
			else locals.dialog.appendChild(buttons);
		}
		
		utils.dom.addClass(locals.dialog,'is-open');
		if(fields) options.fields[0].el.focus();
	}
		
	// Closes panel and removes content
	module.closeDialog = function(element) {
		utils.dom.removeClass(document.body, 'dialog-open');	
		utils.dom.removeClass(document.body, 'is-overlay');
		utils.dom.killElement(locals.dialog, function(){
			locals.dialog = false;
		});
	};
	
	/* ---------------------------------------------

		Slat
	
	-----------------------------------------------*/ 
	
	module.slat = function(content, time){
		var slat_count = Number(locals.slat.messages.length);
		
		// - - - - - - - - - - - - - - - - - - - - - -
		// Create slat container
		// - - - - - - - - - - - - - - - - - - - - - - 
		
		if(!locals.slat.container) {
			locals.slat.container = utils.dom.createElement('div', '', 'slat-container');
			document.body.appendChild(locals.slat.container);
		}
		
		// - - - - - - - - - - - - - - - - - - - - - -
		// Append slat to container
		// - - - - - - - - - - - - - - - - - - - - - - 
		
		var this_slat = utils.dom.createElement('div','', 'slat', null, locals.slat.container);
			utils.dom.createElement('div', content, 'slat-content', null, this_slat);		
			locals.slat.messages.push(this_slat);
		
		// - - - - - - - - - - - - - - - - - - - - - -
		// Close slat button
		// - - - - - - - - - - - - - - - - - - - - - - 
		
		var close_slat = utils.dom.appendElement('button', '', 'close-slat', this_slat);
			
		close_slat.addEventListener('click', function(){
			console.log(locals.slat.messages.indexOf(this_slat));
			killSlat(this_slat);
		});
		
		// - - - - - - - - - - - - - - - - - - - - - -
		// Open slat
		// - - - - - - - - - - - - - - - - - - - - - - 
		
		window.setTimeout(function(){
			utils.dom.addClass(this_slat, 'is-open');
			this_slat.style.height = this_slat.scrollHeight + 'px';
		}, 5);
		
		// - - - - - - - - - - - - - - - - - - - - - -
		// Close timer
		// - - - - - - - - - - - - - - - - - - - - - - 
		
		if(time) {
			setTimeout(function(){
				utils.dom.addClass(this_slat, 'is-closed');
				killSlat(locals.slat.messages[slat_count]);
			}, time);
		}
		
		function killSlat(element) {
			var index = locals.slat.messages.indexOf(element);
			utils.dom.addClass(element, 'is-closed');
			element.style.height = '0';
			setTimeout(function(){
				element.parentNode.removeChild(element);
				
				if(locals.slat.container.children.length == 0) {
					locals.slat.messages = [];
					
					locals.slat.container.parentNode.removeChild(locals.slat.container);
					locals.slat.container = false;
				}
			}, options.animation_time);
		}

	}
	
	/* ---------------------------------------------
	
		Panel
	
	-----------------------------------------------*/ 
	
	module.panel = function(content, options){
		
		// - - - - - - - - - - - - - - - - - - - -
		// Set Options
		// - - - - - - - - - - - - - - - - - - - -
		
		var defaults = {
			position : 'bottom',
			container : document.querySelector('#body-wrapper'),
			size : 33.33,
		};
		
		if(typeof options == 'object') {
			options = {
				position : options.position ? options.position : defaults.position,
				size : options.size ? options.size : defaults.size,
				container : options.container ? document.querySelector(options.container) : defaults.container
			}
		}else {
			options = defaults;
		}
		
		// - - - - - - - - - - - - - - - - - - - -
		// Create Panel
		// - - - - - - - - - - - - - - - - - - - -
		
		if(!locals.panel.el) {
			locals.panel.el = utils.dom.createElement('div', '', 'modal-panel ' + options.position);
			var panel_content = utils.dom.appendElement('div', content, 'modal-panel-content', locals.panel.el);
			
			document.body.appendChild(locals.panel.el);
			locals.panel.options = options;
		}
		
		setTimeout(function(){
			switch(options.position) {
				case 'top' :
					panel_content.style.height = options.size + 1 + 'vh';
					locals.panel.el.style.height = options.size + 1 + 'vh';
					options.container.style.transform = 'translateY(' + options.size + 'vh)';
				break;
				case 'bottom' :
					panel_content.style.height = options.size  + 1 + 'vh';
					locals.panel.el.style.height = options.size  + 1 + 'vh';
					options.container.style.transform = 'translateY(-' + options.size + 'vh)';
				break;
				case 'left' :
					panel_content.style.width = options.size  + 1 + 'vw';
					locals.panel.el.style.width = options.size  + 1 + 'vw';
					options.container.style.transform = 'translateX(' + options.size + 'vw)';
				break;
				case 'right' :
					panel_content.style.width = options.size  + 1 + 'vw';
					locals.panel.el.style.width = options.size  + 1 +  'vw';
					options.container.style.transform = 'translateX(-' + options.size + 'vw)';
				break;
			}
			utils.dom.addClass(locals.panel.el, 'is-open');
			utils.dom.addClass(document.body, 'panel-open');
		}, 15);
		
	}
	
	module.closePanel = function(){
		
		switch(locals.panel.options.position) {
			case 'top' :
				locals.panel.el.style.height = '0px';
			break;
			case 'bottom' :
				locals.panel.el.style.height = '0px';
			break;
			case 'left' :
				locals.panel.el.style.width = '0px';
			break;
			case 'right' :
				locals.panel.el.style.width = '0px';
			break;
		}
		
		locals.panel.options.container.style.transform = '';
		
		utils.dom.removeClass(document.body, 'panel-open');
		utils.dom.removeClass(locals.panel.el, 'is-open');
		
		utils.dom.killElement(locals.panel.el, 300, false, function(){
			locals.panel.el = false;
		});
	};
	
	/* ---------------------------------------------
	
		Toast
	
	-----------------------------------------------*/ 
	
	module.toast = function(content, time){
		var toast_count = Number(locals.toast.messages.length);
		// Init Dialog
		if(!locals.toast.container) {
			locals.toast.container = utils.dom.createElement('div', '', 'toast-container');
			document.body.appendChild(locals.toast.container);
		}
		
		locals.toast.messages[toast_count] = utils.dom.createElement('div', '', 'toast', locals.toast.container);
		locals.toast.messages[toast_count].innerHTML = content;
		locals.toast.container.insertBefore(locals.toast.messages[toast_count], locals.toast.messages[toast_count-1]);
		
		window.setTimeout(function(){
			utils.dom.addClass(locals.toast.messages[toast_count], 'is-open');
		}, 5);
		window.setTimeout(function(){
			utils.dom.addClass(locals.toast.messages[toast_count], 'is-closed');
			killToast(locals.toast.messages[toast_count]);
		}, time);
		
		killToast = function(element) {
			var index = locals.toast.messages.indexOf(element);
			utils.dom.addClass(element, 'is-closed');
			setTimeout(function(){
				element.parentNode.removeChild(element);
				if(index == locals.toast.messages.length - 1) {
					console.log('Kill container');
					locals.toast.messages = [];
					locals.toast.container.parentNode.removeChild(locals.toast.container);
					locals.toast.container = false;
				}
			}, options.animation_time);
		}
	}
	
	return module;
})();

fras.modules.parallax = function(selector, options) {
	// - - - - - - - - - - - - - - - - - - -
	// Set defaults
	// - - - - - - - - - - - - - - - - - - - 
	
	var defaults = {
		intensity : 0.2
	};
	
	options = typeof options == 'object' ? options : defaults;
	options.intensity = options.intensity ? options.intensity : defaults.intensity;
	
	// - - - - - - - - - - - - - - - - - - -
	// Init
	// - - - - - - - - - - - - - - - - - - - 
	
	var elements = document.querySelectorAll(selector),
		els = [],
		winH = window.innerHeight,
		processed = false;
		
	function init(){
		els = [];
		winH = window.innerHeight;
		for(i=0; i < elements.length; i++){
			var el = elements[i];
			var top = fras.utils.dom.cumulativeOffset(el).top,
				center = top + el.offsetHeight/2,
				obj = {
					el : el,
					top : top,
					bottom : top + el.offsetHeight,
					center : center,
					height : el.offsetHeight,
					intensity : el.getAttribute('data-intensity') ? Number(el.getAttribute('data-intensity')) : options.intensity
				}
			els.push(obj);
		};
		processed = true;
	}
	
	
	
	function parallaxScroll() {
		if(processed == false) init();
		
	    var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
	    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	    for(i=0; i < els.length; i++) {
		    var el = els[i],
		    	offset = (scrollTop + winH/2) - el.center;
			el.el.style.transform = 'translateY(' + Number(offset * el.intensity) + 'px)';
			el.el.style.msTransform = 'translateY(' + Number(offset * el.intensity) + 'px)';
		}
	}
	
	
	window.addEventListener('optimizedScroll', parallaxScroll);
	window.addEventListener('optimizedResize', init);
}
/*	======================================

		Scroll Hash v1.0.1

        @param selector : String, required
        @param speed : Number, optional

========================================== */

fras.modules.scrollHash = function(selector, speed, position, callback){

	speed = speed || 600;
	// - - - - - - - - - - - - - - - - - - - -
	// Create Handlers
	// - - - - - - - - - - - - - - - - - - - -

	function scrollHandler(e) {
		e.preventDefault();
		var target = document.querySelector(e.target.getAttribute('href'));
		if(target) {
    		if(history.pushState) {
			    history.pushState(e.target.getAttribute('href'), "page 2", e.target.getAttribute('href'));
			}
			fras.animate.scrollToElement(target, speed, position, callback);
			fras.$('.selected-hash').removeClass('selected-hash');
			fras.$(target).addClass('selected-hash');
		}
	}

	// - - - - - - - - - - - - - - - - - - - -
	// Add handlers
	// - - - - - - - - - - - - - - - - - - - -

	fras.$(selector).on('click', scrollHandler);

};

fras.modules.selectButton = function selectButton(selector, options){
	var self = this;
	var elements = document.querySelectorAll(selector);
	for(i=0; i < elements.length; i++) {
		var title = document.createElement('span');
		var title_text = elements[i].options[0].text;
		addClass(title, 'title');
		title.innerHTML = title_text;
		
		elements[i].parentNode.appendChild(title);
		
		if(elements[i].hasAttribute('data-change-label')) {
			elements[i].addEventListener('change', selectHandler);
		}
	}
	
	function selectHandler(event){
		var element = event.currentTarget;
		var title = element.hasAttribute('data-default') ?  element.getAttribute('data-default') : element.options[element.selectedIndex].text;
		var label = element.parentNode.querySelector('.title');
		label.innerHTML = title;
	}
}
fras.modules.selectList = function(selector, options){
	
	function selectHandler(e) {
		e.preventDefault();
		var el = e.currentTarget,
			active = el.parentNode.querySelectorAll('.is-active');
			console.log(active);
		if(active.length) fras.utils.dom.removeClass(active,'is-active');
		fras.utils.dom.addClass(el, 'is-active');
	}
	
	fras.listenerManager.bind([selector + ' > *', function(el) {
		el.addEventListener('click', selectHandler);
	}]);
}
/*	======================================

	Slider Constructor

========================================== */


fras.modules.ContentSlider = function(id, options){
	
	if(!document.getElementById(id)) return null;
	
	// -------------------------
	// Cache GroundWork Methods
	// -------------------------
	
	var addClass = fras.utils.dom.addClass;
	var removeClass = fras.utils.dom.removeClass;
	var lazyLoad = fras.lazyLoad;
	
	
	// -------------------------
	// Options
	// -------------------------
	
	options = options ? options : {};
	
	if (options.slidesShown === undefined) {
	    options.slidesShown = 2;
	}
	
	if (options.slidesScroll === undefined) {
		options.slidesScroll = 1;
	}
	
	if (options.mobileShown === undefined) {
		options.mobileShown = 1;
	}
	
	if (options.navigation === undefined) {
		options.navigation = true;
	}
	if (options.style === undefined) {
		options.style = 'default';
	}
	
	if (options.auto === undefined) {
		options.auto = false;
	}
	
	if (options.prev === undefined) {
		options.prev = false;
	}
	
	if (options.next === undefined) {
		options.next = false;
	}
	
	if (options.customNav === undefined) {
		options.customNav = false;
	}
	
	// -------------------------
	// Private Variables
	// -------------------------
	
	var self = this,
			orig_slidesShown = options.slidesShown,
			orig_slidesScroll = options.slidesScroll,
			current_slide = 0,
			last_slide = 0,
			click_scroll = false,
			break_scroll = false,
			last_scroll = 0,
			last_delta = 0,
			last_delta_dist = 0,
			over_slider = false,
			swipedir,
	    touchX,
	    touchY,
	    distX,
	    distY,
	    auto_timer,
	    scroll_timer;
	
	// -------------------------
	// Public Properties
	// -------------------------
	
	this.target = document.getElementById(id);
	this.parent = this.target.parentNode;
	this.children = this.target.querySelectorAll('.slide');
	this.counter = this.parent.querySelector('.counter');
	this.elwidth = this.target.offsetWidth;
	this.markers = [];


	if(this.children.length > 1) {
		
		// -------------------------
		// Initialize Slider
		// -------------------------
		
		(this.init = function(){
			self.target.querySelector('.content-slider-inner').style.width = (self.children.length * 100)/options.slidesShown + '%';
			
			
			if(options.navigation == true && !self.nav) {
				self.nav = document.createElement('div');
				addClass(self.nav, 'navi-arrows ' + 'navi-' + options.style);
				
				// Buttons
				self.next_button = document.createElement('button');
				self.prev_button = document.createElement('button');
				
				addClass(self.next_button, 'btn-circle-small');
				addClass(self.prev_button, 'btn-circle-small');
				self.next_button.innerHTML = '<i class="icon"></i>';
				self.prev_button.innerHTML = '<i class="icon"></i>';
				
				self.next_button.addEventListener('click', function(event) {
					self.next();
				});
				
				self.prev_button.addEventListener('click',  function(event) {
					self.prev();
				});
				
				// Counter Markers
				self.place_container = document.createElement('div');
				addClass(self.place_container, 'place-container');
				
				self.place_nav = document.createElement('ul');
				addClass(self.place_nav, 'place-nav');
				
				self.place_container.appendChild(self.place_nav);
				
				if(options.style == 'default'){
					self.counter = document.createElement('div');
					addClass(self.counter, 'counter');
					self.counter.innerHTML = 1;
					self.place_container.appendChild(self.counter);
				}
				
				// Create li numberd for each slide
				for(i=0; i < self.children.length / options.slidesScroll; i++) {
					if(i <= self.children.length - options.slidesShown){ 
						self.markers[i] = document.createElement('li');
						self.markers[i].innerHTML = '<a href="#"> ' + Number(i + 1) + '</a>';
						self.markers[i].setAttribute('data-slide', i);
						self.markers[i].addEventListener('click', function(event){
							var slide = Number(event.currentTarget.getAttribute('data-slide'));
							event.preventDefault();
							self.goTo(slide * options.slidesScroll);
						});
						self.place_nav.appendChild(self.markers[i]);
					}
				}
				
				addClass(self.place_nav, 'place-nav');
				
				// Compile nav and place below target slider
				self.nav.appendChild(self.prev_button);
				self.nav.appendChild(self.place_container);
				self.nav.appendChild(self.next_button);
				self.parent.appendChild(self.nav);
				
			}
		})();
		
		// -------------------------
		// Core Methods
		// -------------------------
		
		this.activate = function(speed){
			var speed = speed || 300;
			var scrollTo = self.children[current_slide].offsetLeft;
			
			// Set classes for Active Slides
			for (i=0; i < options.slidesShown ; i ++) {
					if(self.children[current_slide + i]){
						removeClass(self.children[current_slide + i], 'is-back');
						addClass(self.children[current_slide + i], 'is-active-slide');
					}
			}
			
			// Set the markers
			if(options.navigation) {
				if(self.markers[current_slide/options.slidesScroll] && self.markers[last_slide]) {
					addClass(self.markers[current_slide/options.slidesScroll], 'is-active');
					removeClass(self.markers[last_slide], 'is-active');
				}
			}
			
			//Scroll Slider
			self.scrollTo(scrollTo, 400, function(){
					click_scroll = false;
			});
			last_slide = current_slide/options.slidesScroll;
			
			
			
			if(options.navigation && current_slide + 1 > self.children.length - options.slidesShown) {
				self.next_button.setAttribute('disabled', 'disabled');
			}
			else if (options.navigation){
				self.next_button.removeAttribute('disabled');
			}
			
			if(options.navigation && current_slide == 0) {
				self.prev_button.setAttribute('disabled', 'disabled');
			}else if(options.navigation){
				self.prev_button.removeAttribute('disabled');
			}
			
			if(self.counter) self.counter.innerHTML = Math.ceil(current_slide/options.slidesScroll + 1);
		}
		
		this.scrollTo = function(to, duration, callback) {
		    if(options.auto) {
			    window.clearTimeout(auto_timer);
		    }
		    break_scroll = false;
		    clearTimeout(scroll_timer);
		    var element = self.target;
		    var start = element.scrollLeft,
		        change = to - start,
		        currentTime = 0,
		        increment = 20;
		        
		    var animateScroll = function(){      
		        currentTime += increment;
		        var val = Math.easeInOutCirc(currentTime, start, change, duration);
		        element.scrollLeft = val;
		        if(currentTime < duration && break_scroll === false) {
		            scroll_timer = setTimeout(animateScroll, increment);
		        }
		        else{
			        if (callback) {
				        callback();
				    }
		        }
		    	lazyLoad();
		    };
			animateScroll();
			
			if(options.auto) {
				autoSlide(options.auto);
		    }
		}
		
		this.next = function(speed){
			if(current_slide + options.slidesScroll < self.children.length - options.slidesShown) {
				click_scroll = true;
				current_slide = current_slide + options.slidesScroll;
				
				for (i=1; i < options.slidesScroll + 1 ; i ++) {
					removeClass(self.children[current_slide - i], 'is-active-slide');
					removeClass(self.children[current_slide - i], 'in-back');
					addClass(self.children[current_slide - i], 'is-back');
				}
				
				self.activate(speed);
			}else {
				current_slide = current_slide + (self.children.length - options.slidesShown - current_slide);
				click_scroll = true;
				for (i=1; i < options.slidesScroll + 1 ; i ++) {
					if(self.children[current_slide - i]) {
						removeClass(self.children[current_slide - i], 'is-active-slide');
						removeClass(self.children[current_slide - i], 'in-back');
						addClass(self.children[current_slide - i], 'is-back');
					}
				}
				self.activate(speed);
			}
		};
		
		this.prev = function(speed){
			if(current_slide >= options.slidesScroll && current_slide % options.slidesScroll == 0) {
				click_scroll = true;
				if(options.navigation) self.next_button.removeAttribute('disabled');
				for (i=0; i < options.slidesShown ; i ++) {
					if(self.children[current_slide + i]) {
						removeClass(self.children[current_slide + i], 'is-active-slide');
					}
				}
				current_slide = current_slide - options.slidesScroll;
				addClass(self.children[current_slide], 'in-back');
				
				self.activate(speed);
			}
			else {
				click_scroll = true;
				if(options.navigation) self.next_button.removeAttribute('disabled');
				for (i=0; i < options.slidesShown ; i ++) {
					if(self.children[current_slide + i]){
						removeClass(self.children[current_slide + i], 'is-active-slide');
					}
				}
				addClass(self.children[current_slide], 'in-back');
				
				current_slide = current_slide - (current_slide % options.slidesScroll);
				self.activate(speed);
			}
		};
		
		this.goTo = function(slide){
				click_scroll = true;
				for (i=0; i < options.slidesShown ; i ++) {
					if(self.children[current_slide + i]) {
						removeClass(self.children[current_slide + i], 'is-active-slide');
					}
				}
				current_slide = slide;
				
				self.activate();
		};
		
		// -------------------------
		// Auto slide option
		// -------------------------
		
		if(options.auto) {
			autoSlide(options.auto);
			self.target.addEventListener('mouseover', function(){
				window.clearTimeout(auto_timer);
			});
			self.target.addEventListener('mouseleave', function(){
				autoSlide(options.auto);
			});
			if(options.navigation == true) {
				self.nav.addEventListener('mouseover', function(){
					window.clearTimeout(auto_timer);
				});
				self.nav.addEventListener('mouseleave', function(){
				  autoSlide(options.auto);
				});
			}
		}
		
		function autoSlide(time) {
			window.clearTimeout(auto_timer);
			auto_timer = window.setTimeout(function(){
			  if(current_slide + options.slidesScroll < self.children.length){
				 self.next();
			  }else{
				 self.goTo(0); 
			  }
			  autoSlide(time);
			}, time);
		}
	 
		// -------------------------
		// Next button slide option
		// -------------------------
		
		if(options.next) {
		  var next_element = document.querySelector(options.next);
		  if(next_element) next_element.addEventListener('click', self.next);
		}
		
		// -------------------------
		// Prev button slide option
		// -------------------------
		if(options.prev) {
				var prev_element = document.querySelector(options.prev);
				if(prev_element) prev_element.addEventListener('click', self.prev);;
		}
		
		// -------------------------
		// Custom nav option
		// -------------------------
		
		if(options.customNav) {
		  var nav_items = document.querySelectorAll(options.customNav +' [data-slide-to]');
		  forEach(nav_items, function(element){
			  element.addEventListener('click', customNavigation);
		  });
		}
		// Function for custom nav button clicks
		function customNavigation(event){
			var element = document.querySelector(event.dataset.slideTo);
			if(element) {
				slide = element.dataset.slide ? Number(slide.dataset.slide) : false;
				if(slide) self.goTo(slide); 
			}
		}
		
		//---------------------------------
		// Resize
		//---------------------------------
		
		window.addEventListener("optimizedResize", self.resize);
		
		(this.resize = function(){
			var winW = window.innerWidth;
			if(winW < 724) {
				options.slidesShown = options.mobileShown;
				options.slidesScroll = 1;
				self.init();
				self.target.querySelector('.content-slider-inner').style.width = (self.children.length * 100)/options.slidesShown + '%';
			}
			else{
				options.slidesShown = orig_slidesShown;
				options.slidesScroll = orig_slidesScroll;
				self.init();
				self.target.querySelector('.content-slider-inner').style.width = (self.children.length * 100)/options.slidesShown + '%';
			}
			break_scroll = true;
			self.activate();
		})();
		
		//---------------------------------
		// Keyboard
		//---------------------------------
		
		document.addEventListener("keydown", keydownHandler);
		
		function keydownHandler(event){		
			if(over_slider == true) {
			    if (event.keyCode == '37') {
				    self.prev();
			    }
			    else if (event.keyCode == '39') {
			        self.next();
		    	}
	    	}
		}
		
		//---------------------------------
		// Mouse handlers
		//---------------------------------
		
		this.parent.addEventListener('mouseover', function(){
			over_slider = true;
		});
		this.parent.addEventListener('mouseleave', function(){
			over_slider = false;
		});
		
		this.parent.addEventListener("wheel", MouseWheelHandler, false);
		
		function MouseWheelHandler(event) {
			var deltaX = event.wheelDeltaX ? event.wheelDeltaX * -1 : event.deltaX;
			var deltaY = event.wheelDeltaY ? event.wheelDeltaY * -1: event.deltaY;
			if(Math.abs(deltaX) - Math.abs(deltaY) > 0){
				event.preventDefault();
				
				var delta = Math.max(-1, Math.min(1, -deltaX));
				
				if(last_scroll !== delta && click_scroll == true && last_scroll !== 0) {
					break_scroll = true;
				}
				
				if(click_scroll === false && (Math.abs(deltaX)-last_delta) > 0) {
					if (delta > 0) {
						self.prev();
					}
					else {
						self.next();
					}
				}
				
				last_scroll = delta;
				last_delta_dist = Math.abs(deltaX - last_delta);
				last_delta = Math.abs(deltaX);
			}
			if(click_scroll == true) {
				event.preventDefault();
			}
		}
		
		
		//---------------------------------
		// Touch handlers
		//---------------------------------
		
		self.parent.addEventListener('touchstart', function(e){
	    	var touchobj = e.changedTouches[0];
			swipedir = 'none';
			dist = 0;
			touchX = touchobj.screenX;
			touchY = touchobj.screenY;
		}, false);
	
		self.parent.addEventListener('touchmove', function(e){
		var touchobj = e.changedTouches[0];
		var movementY = Math.abs(touchobj.screenY-touchY);
		var movementX = Math.abs(touchobj.screenX-touchX);
		var dir = touchobj.screenX > touchX ? 1 : -1;
		
		if(dir !== swipedir) break_scroll = true;
		
		if(click_scroll === false && movementY < movementX) {
		  e.preventDefault();
		  
		  self.target.scrollLeft += -(touchobj.pageX - touchX) * 1.2;
		  
		  var measure = self.target.offsetWidth/options.slidesShown * options.slidesScroll;
				var place 	= measure * current_slide;
				var scroll 	= self.target.scrollLeft - place;
				
				scroll = scroll/measure;
				
				if(scroll > 0.33) {
					self.next();
				}
				
				if(scroll < -0.33) {
					self.prev();
				}
		}
		
		swipedir = touchobj.screenX > touchX ? 1 : -1;
		touchY = touchobj.screenY;
		touchX = touchobj.screenX;
		}, false);
		
		    
		self.parent.addEventListener('touchend', function(e){
			var measure = self.target.offsetWidth/options.slidesShown * options.slidesScroll;
			var place 	= measure * current_slide;
			var scroll 	= self.target.scrollLeft - place;
			scroll = scroll/measure;
			
			if(scroll < 0.33) {
				self.activate();
			}
		},false);
		
		//---------------------------------
		// Start Slider
		//---------------------------------

		self.activate();
		
	}
}
/*	======================================

		Sticky

========================================= */
fras.modules.Sticky = function Sticky(el, options) {
    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Set options
    // - - - - - - - - - - - - - - - - - - - - - - - -
    this.options = options;
    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache fras
    // - - - - - - - - - - - - - - - - - - - - - - - -
    var dom = fras.utils.dom,
        els = document.querySelectorAll(el);
    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache elements and positions
    // - - - - - - - - - - - - - - - - - - - - - - - -
    this.winH = window.innerHeight;
    this.query = el;
    this.els = [];
    for (i = 0; i < els.length; i++) {
        var el = els[i];
        var item_offset = dom.cumulativeOffset(el);
        var el_obj = {
            el: el,
            width: el.offsetWidth,
            offset: item_offset
        };
        el.style.paddingTop = fras.trackers.header_transform + 'px';
        if (el.hasAttribute('data-contain')) {
            var container = document.getElementById((el.getAttribute('data-contain')));
            var container_offset = dom.cumulativeOffset(container);
            var stop = container_offset.top + container.offsetHeight - el.offsetHeight;
            el_obj.container_offset = container_offset;
            el_obj.container = container;
            el_obj.stop = stop;
        }
        this.els.push(el_obj);
    }
    var headerHeight = document.querySelector('.js-header');
    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache and bind constructor functions
    // - - - - - - - - - - - - - - - - - - - - - - - -
    var resizeSticky = this.resizeSticky.bind(this),
        makeSticky = this.makeSticky.bind(this);
    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Listeners
    // - - - - - - - - - - - - - - - - - - - - - - - -
    document.addEventListener("DOMContentLoaded", resizeSticky);
    window.addEventListener('optimizedScroll', makeSticky);
    window.addEventListener('optimizedResize', resizeSticky);
}
fras.modules.Sticky.prototype.resizeSticky = function() {
    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache fras
    // - - - - - - - - - - - - - - - - - - - - - - - -
    var dom = fras.utils.dom,
        els = document.querySelectorAll(this.query);
    this.winH = window.innerHeight;
    this.els = [];
    for (i = 0; i < els.length; i++) {
        var el = els[i];
        var item_offset = dom.cumulativeOffset(el);
        var el_obj = {
            el: el,
            width: el.offsetWidth,
            offset: item_offset
        };
        if (fras.$(el).hasClass('stickied')) {
            el.style.position = 'static';
            el.style.width = '';
            el_obj.width = el.offsetWidth;
            el.style.width = el.offsetWidth + 'px';
            el_obj.offset = dom.cumulativeOffset(el);
            el.style.position = '';
        }
        if (el.hasAttribute('data-contain')) {
            var container = document.getElementById((el.getAttribute('data-contain')));
            var container_offset = dom.cumulativeOffset(container);
            var stop = container_offset.top + container.offsetHeight - el.offsetHeight;
            el_obj.container = container;
            el_obj.container_offset = container_offset;
            el_obj.stop = stop;
        }
        this.els.push(el_obj);
    }
}
fras.modules.Sticky.prototype.makeSticky = function(event) {
    // - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache fras
    // - - - - - - - - - - - - - - - - - - - - - - - -
    var dom = fras.utils.dom,
        scroll_pos = window.pageYOffset || document.documentElement.scrollTop;
    for (i = 0; i < this.els.length; i++) {
        var item = this.els[i];
        if (item.container) {
            if (scroll_pos >= item.container_offset.top && scroll_pos < item.stop) {
                if (!dom.hasClass(item.el, 'stickied')) {
                    item.el.style.width = item.el.offsetWidth + 'px';
                    item.el.style.top = 0;
                    item.el.style.bottom = '';
                    item.el.style.position = '';
                    dom.addClass(item.el, 'stickied');
                }
            } else if (scroll_pos >= item.stop) {
                if (dom.hasClass(item.el, 'stickied')) {
                    item.container.style.paddingTop = '';
                    dom.removeClass(item.el, 'stickied');
                    item.el.style.top = '';
                    item.el.style.bottom = '0';
                    item.el.style.position = 'absolute';
                    item.el.style.width = item.width + 'px'
                }
            } else {
                if (dom.hasClass(item.el, 'stickied')) {
                    item.container.style.paddingTop = '';
                    dom.removeClass(item.el, 'stickied');
                    item.el.style.top = '';
                    item.el.style.bottom = '';
                    item.el.style.position = '';
                    item.el.style.width = ''
                }
            }
        } else {
            var offset_top = item.el.getAttribute('data-offset') ? item.el.getAttribute('data-offset') : 0;
            var start_top = item.el.hasAttribute('data-header-start') ? headerHeight.offsetHeight : 0;
            if (item.el.hasAttribute('data-header-offset')) offset_top = offset_top + headerHeight.offsetHeight;
            if (item.offset.top < scroll_pos + offset_top - start_top) {
                item.el.style.width = item.el.offsetWidth + 'px';
                dom.addClass(item.el, 'stickied');
                item.el.style.top = offset_top + 'px';
            } else {
                dom.removeClass(item.el, 'stickied');
                item.el.style.top = '';
                item.el.style.width = ''
            }
        }
    };
}

/*	======================================

		Tabs v1
		
		options :
			navigation 	: String, default ".tab-nav", the selector for the navigation ul element.
			next		: String, default ".tab-next", Selctor for the next button.
			prev		: String, default ".tab-prev", Selctor for the prev button.
		
		methods :
			Tabs.next()
			Tabs.prev()
		datasets :
			data-url : If provided, url content will be loaded into tab when first activated

========================================== */

fras.modules.Tabs = function(el, options){
	
	var el = document.getElementById(el);
	if(!el) return null;
	
	// - - - - - - - - - - - - - - - - - - - -
	// Define
	// - - - - - - - - - - - - - - - - - - - -
	
	this.el = el;
	this.current_tab = 0;
	
	// - - - - - - - - - - - - - - - - - - - -
	// Cache fras utils
	// - - - - - - - - - - - - - - - - - - - -
	
	var forEach = fras.utils.dom.forEach,
		addClass = fras.utils.dom.addClass,
		removeClass = fras.utils.dom.removeClass;
	
	// - - - - - - - - - - - - - - - - - - - -
	// Set Options
	// - - - - - - - - - - - - - - - - - - - -
	
	var defaults = {
		navigation : el.querySelector('.tab-nav'),
		next : el.querySelector('.tab-next'),
		prev : el.querySelector('.tab-prev')
	};
	
	if(typeof options == 'object') {
		options = {
			navigation : options.navigation ? document.querySelector(navigation.options) : defaults.navigation,
			next : options.navigation ?  document.querySelector(navigation.next) : defaults.next,
			prev : options.navigation ?  document.querySelector(navigation.prev) : defaults.prev,
		}
	}else {
		options = defaults;
	}
	
	// - - - - - - - - - - - - - - - - - - - -
	// Cache Tab Panes and Navigation items
	// - - - - - - - - - - - - - - - - - - - -
	
	this.panes = [].slice.call(el.querySelectorAll('.tab-pane')),
	this.navigation = [].slice.call(options.navigation.querySelectorAll('[href]'));
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Wrap functions to mainain instance reference on events
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	
	var next = this.next.bind(this),
		prev = this.prev.bind(this),
		goTo = this.goTo.bind(this),
		listeners = (function() {
			for(i=0; i < this.panes.length ; i ++) {
				var hash = '#' + this.panes[i].id;
				var targets = [].slice.call(document.querySelectorAll('[href="'+ hash +'"]'));
				for(t=0 ; t < targets.length; t ++) {
					targets[t].addEventListener('click', goTo);
				}
			}
		}).bind(this);
	
	
	
	// - - - - - - - - - - - - - - - - - - - -
	// Add handlers
	// - - - - - - - - - - - - - - - - - - - -
	
	fras.listenerManager.bind([this.el, listeners]);
	
	if (options.next) fras.listenerManager.bind([options.next, function(el) { el.addEventListener('click', next, true)}]);
	if (options.prev) fras.listenerManager.bind([options.prev, function(el) { el.addEventListener('click', prev, true)}]);
	
	// - - - - - - - - - - - - - - - - - - - -
	//	Activate
	// - - - - - - - - - - - - - - - - - - - -
	
	this.activateTab(this.panes[0]);
};

// - - - - - - - - - - - - - - - - - - - -
// Add Functions to the constructor's prototype
// - - - - - - - - - - - - - - - - - - - -

fras.modules.Tabs.prototype.goTo = function(e){
	e.preventDefault();
	var target = this.el.querySelector(e.target.getAttribute('href'));
	this.activateTab(target);
}

fras.modules.Tabs.prototype.next = function(e){
	e.preventDefault();
	this.current_tab = this.current_tab < this.panes.length -1 ? this.current_tab + 1 : 0;
	var target = this.panes[this.current_tab];
	this.activateTab(target)
}

fras.modules.Tabs.prototype.prev = function(e){
	e.preventDefault();
	this.current_tab = this.current_tab > 0 ? this.current_tab - 1 : this.panes.length - 1;
	var target = this.panes[this.current_tab];
	this.activateTab(target);
}

fras.modules.Tabs.prototype.activateTab = function(target) {
	
	// - - - - - - - - - - - - - - - - - - - -
	// Cache fras tools
	// - - - - - - - - - - - - - - - - - - - -
	
	var addClass = fras.utils.dom.addClass,
		removeClass = fras.utils.dom.removeClass,
		ajax = fras.ajax,
	
	// - - - - - - - - - - - - - - - - - - - -
	// Set local vars
	// - - - - - - - - - - - - - - - - - - - -
	
		i = this.panes.indexOf(target),
		nav_tab = this.navigation[i],
		pane_h = this.panes[i].offsetHeight;
	
	
	// - - - - - - - - - - - - - - - - - - - -
	// Set instance vars
	// - - - - - - - - - - - - - - - - - - - -
	
	this.current_tab = i;
	
	// - - - - - - - - - - - - - - - - - - - -
	// Loop through all tab panes and activate/deactivate/position-class each pane and it's associated nav element.
	// - - - - - - - - - - - - - - - - - - - -
	
	for(p=0; p < this.panes.length; p++) {
		if(p < i) {
			removeClass(this.navigation[p].parentNode, 'is-active');
			removeClass(this.panes[p], 'is-next is-active');
			addClass(this.panes[p], 'is-prev');
		}
		else if(p > i) {
			removeClass(this.navigation[p].parentNode, 'is-active');
			removeClass(this.panes[p], 'is-prev is-active');
			addClass(this.panes[p], 'is-next');
		}
		else if(p == i) {
			addClass(this.navigation[p].parentNode, 'is-active');
			removeClass(this.panes[p], 'is-prev is-next');
			addClass(this.panes[p], 'is-active');
		}
	}
	
	addClass(target, 'is-active');
	addClass(nav_tab, 'is-active');
	
	// - - - - - - - - - - - - - - - - - - - -
	// Load in content if tab pane has data-url
	// - - - - - - - - - - - - - - - - - - - -
	
	if(target.dataset.url) {
		ajax.loadView(target.dataset.url, this.panes[i], function(){
			pane_h = target.offsetHeight;
			target.parentNode.style.height = pane_h + 'px';
		});
		target.dataset.url = '';
	}else {
		this.panes[i].parentNode.style.height = pane_h + 'px';
	}
}
/*	======================================

		YOU TUBE

========================================== */


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function getYouTubeId(url) {
	var you_regex = /http:\/\/(?:youtu\.be\/|(?:[a-z]{2,3}\.)?youtube\.com\/watch(?:\?|#\!)v=)([\w-]{11}).*/gi;
	var video_id = you_regex.exec(url);
	return match[0];
}

//**Event
function videoModalClickEvent(event) {	
	var attr = event.target.getAttribute('data-video-url');
	var player;
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('youtube-video-player', {
			videoId: '',
			height: '1080',
			width: '1920',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}
	player.loadVideoById('sqBCNjYKMI0');
	modalOpen(attr);
	event.preventDefault();
}

// Close video
function videoClose(element, index){
	element.addEventListener('click',videoCloseEvent);
}

//**Event
function videoCloseEvent(event) {	
		modalClose();
		document.getElementById('youtube-video-player').innerHTML = '';
		event.preventDefault();
}
//- - - - - - - - - - - - - - - - - - - - - - - -
// This is a placeholder for application/site
// specific code.
//- - - - - - - - - - - - - - - - - - - - - - - -

var appDemo = (function(){

	//- - - - - - - - - - - - - - - - - - - - - - - -
	//	Set up Ground Work modules and components
	//- - - - - - - - - - - - - - - - - - - - - - - -
    fras.$('.field').fieldControl();
	fras.$('.utility-range input').rangeSlider();

	//- - - - - - - - - - - - - - - - - - - - - - - -
	//	Create applicating schema
	//- - - - - - - - - - - - - - - - - - - - - - - -

	var demo = {
		home : {},
	};

	return demo;

})();
