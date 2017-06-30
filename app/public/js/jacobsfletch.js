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

module.exports = {
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
                if (!fras.utils.dom.hasClass(el, 'activated')) {
                    setTimeout(function () {
                        fras.utils.dom.addClass(el, 'activated');
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
            if (!fras.utils.dom.hasClass(el, 'activated')) {
                setTimeout(function () {
                    fras.utils.dom.removeClass(el, 'activated');
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

module.exports = {
    // Get Age from Birthdate
    getAge: function (birth) {

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

        if (age_month < 0 || (age_month == 0 && age_day < 0)) {
            age = parseInt(age) - 1;
        }
        return (age);
    },
    getHeight: function (height) {
        height = Math.floor(height / 12) + "' " + (height % 12) + '"';
        return (height);
    },

    getMonthName: function (month) {
        monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthName[month];
    }
}

module.exports = function (func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

module.exports = function () {
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
            for (var i = 0; i < len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        l = form.elements[i].options.length;
                        for (var j = 0; j < l; j++) {
                            if (field.options[j].selected)
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            }
            return s.join('&').replace(/%20/g, '+');
        } else if (form !== undefined) {
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
            if (window.FormData) {
                args.data = new FormData(args.data);
            } else { // ie9 fallback
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
        if (window.FormData && args.append) {
            args.data.append(args.append);
        } else if (args.append) { // ie9 fallback
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
        } else if (window.FormData == null) { // ie9 fallback
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
};

module.exports = function (form, options) {
    form = document.getElementById(form);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Cache fras tools
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var createElement = fras.utils.dom.createElement;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Set Options
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    options = { // set default options
        success: options.success ? options.success : function () {
            form.submit()
        },
        fail: options.fail ? options.fail : function (msg) {
            console.log(msg)
        },
        rules: options.rules ? options.rules : false,
        error_class: options.error_class ? options.error_class : 'is-error',
        valid_class: options.valid_class ? options.valid_class : 'is-valid',
        validHandler: options.validHandler && typeof options.validHandler == 'function' ? options.validHandler : function (el) {
            el.parentNode.classList.remove(options.error_class);
            el.parentNode.classList.add(options.valid_class);
        },
        errorHandler: options.errorHandler && typeof options.errorHandler == 'function' ? options.errorHandler : function (el, message) {
            el.parentNode.classList.remove(options.valid_class);
            el.parentNode.classList.add(options.error_class);
            var error_message = el.parentNode.querySelector('.field-tooltip');
            if (error_message) error_message.innerHTML = message;
            else createElement('div', message, 'field-tooltip', null, el.parentNode);
        },
    }
    var self = this;
    this.options = options;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Handler Functions
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function isValid(el) {
        self.options.validHandler(el);
    }

    function isError(el, message) {
        self.options.errorHandler(el, message);
        self.message.errors++;
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
            errors: 0,
            fields: []
        };

        // My Privates
        var getRadioCheckedValue = function (form, radio_name) {
            var oRadio = form.els[radio_name];

            for (var i = 0; i < oRadio.length; i++) {
                if (oRadio[i].checked) {
                    return oRadio[i].value;
                }
            }

            return '';
        }

        // Init

        for (i = 0; i < this.validate_fields.length; i++) {
            var el = this.validate_fields[i],
                method = el.getAttribute('data-validate'),
                errored = el.parentNode.classList.contains('is-error');
            if (errored) {
                el.addEventListener('change', validateField);
            }
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            validateForm(e)
        });
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Core Public Methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    this.validateForm = function (el) {
        if (el.target) {
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

    this.validateField = function (el) {
        var el = el.target ? el.target : el,
            value = el.value;

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Check if element depends on another elements value or checkedness...
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if (el.hasAttribute('validate-depends')) {
            var el_value;
            if (form.els[el.getAttribute('validate-depends')].type == 'radio') {
                el_value = getRadioCheckedValue(form, el.getAttribute('validate-depends'));
            } else {
                el_value = form.els[el.getAttribute('validate-depends')].value;
            }

            if (el.hasAttribute('validate-depends-value') && el_value !== el.getAttribute('validate-depends-value')) {
                el.parentNode.classList.remove('is-error');
                el.parentNode.classList.remove('is-valid');
                return true;
            }
            if (el_value == '') {
                el.parentNode.classList.remove('is-error');
                el.parentNode.classList.remove('is-valid');
                return true;
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Check max character length
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if (el.hasAttribute('data-max')) {
            var max = Number(el.getAttribute('data-max'));
            if (max < value.length) {
                isError(el);
                return false;
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Check min character length
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if (el.hasAttribute('data-min')) {
            var min = Number(el.getAttribute('data-min'));
            if (min < value.length) {
                isError(el);
                return false;
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Cache validation methods and messages
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        var methods = el.getAttribute('validate'),
            message = el.getAttribute('validate-message'),
            parent_el = el.parentNode,
            required = el.hasAttribute('required'),
            valid = true;

        methods = (required && !methods) ? ['required'] : methods.replace(/\s/g, '').split(',');
        required = !required ? Array.prototype.indexOf('required', methods) : required;

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Iterate through the validation methods
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        if (required || !required && value.length > 0) {
            for (t = 0; t < methods.length; t++) {
                if (methods[t] && typeof this.validateMethods[methods[t]].validate == 'function') {
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

fras.Validator.prototype.addMethod = function (name, method, message) {
    fras.Validator.prototype.validateMethods[name] = {
        validate: method,
        message: message
    }
};

fras.Validator.prototype.validateMethods = { // private prop
    required: {
        validate: function (val, el) {
            if (val.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        message: 'This field is required'
    },
    number: {
        validate: function (val, el) {
            var re = /^[0-9.]+$/
            var rslt = re.test(val);
            return rslt;
        },
        message: 'This field is required'
    },
    email: {
        validate: function (val, el) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            var rslt = re.test(val);
            return rslt;
        },
        message: 'Please input a valid email address'
    },
    checked: {
        validate: function (val, el) {
            if (el.checked == true) {
                return true;
            } else {
                return false;
            }
        },
        message: 'This field is required'
    },
    phone: {
        validate: function (val, el) {
            var phone2 = /^(\+\d)*\s*(\(\d{3}\)\s*)*\d{3}(-{0,1}|\s{0,1})\d{2}(-{0,1}|\s{0,1})\d{2}$/;
            if (val.match(phone2)) {
                return true;
            } else {
                return false;
            }
        },
        message: 'This field is required'
    },
    fileExtension: {
        validate: function (val, el) {
            var alphaExp = /.*\.(gif)|(jpeg)|(jpg)|(png)$/;
            if (el.value.toLowerCase().match(alphaExp)) {
                return true;
            } else {
                return false;
            }
        },
        message: 'This field is required'
    },
    date: {
        validate: function (val, el) {
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
        message: 'This field is required'
    },
    dob: {
        validate: function (val, el) {
            if (validateMethods.isDate(el)) {
                dob = new Date(val);
                today = new Date();
                today.setFullYear(today.getFullYear() - 5);
                return dob < today;
            } else {
                return false;
            }
        },
        message: 'This field is required'
    },
    name: {
        validate: function (val, el) {
            var re = /^[A-Za-z0-9 ]{3,50}$/;
            var rslt = re.test(val);
            return rslt;
        },
        message: 'This field is required'
    },
    password: {
        validate: function (val, el) {
            var re = /^(?=.*\d).{8,20}$/;
            var rslt = re.test(val);
            return rslt;
        },
        message: 'This field is required'
    },
    url: {
        validate: function (val, el) {
            var re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            var rslt = re.test(val);
            return rslt;
        },
        message: 'This field is required'
    },
    zip: {
        validate: function (val, el) {
            var re = /^\d{5}(?:[-\s]\d{4})?$/;
            var rslt = re.test(val);
            console.log(rslt)
            return rslt;
        },
        message: 'This field is required'
    },
    match: {
        validate: function (val, el) {
            var match = document.getElementById(el.getAttribute('validate-match-value')).value;

            if (val == match) {
                return true;
            } else {
                return false;
            }
        },
        message: 'This field is required'
    }
}

//- //////////////////////////////////////////////////

//- // Color Scroll Animation

//- //////////////////////////////////////////////////

module.exports = function(selector, options) {

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

//- - - - - - - - - - - - - - - - - - - - - - - -
// This is a placeholder for application/site
// specific code.
//- - - - - - - - - - - - - - - - - - - - - - - -

var appDemo = (function(){

	var demo = {
		home : {},
	};

	return demo;

})();
