////////////////////////////////////////////////////////////////////////////

// scrollController

////////////////////////////////////////////////////////////////////////////

preventDefault = function(event) {
    event.preventDefault();
}

window.addEventListener('touchmove', preventDefault);
window.addEventListener('wheel', preventDefault);

var touchStart = 0;
    scrollDistance = 0;

function touchStartHandler(event) {
    touchStart = event.touches[0].pageY;
}

function scrollHandler(event) {
    scrollDistance = event.deltaY ? event.deltaY : event.touches ? (touchStart - event.touches[0].pageY) : null;
    touchStart = event.touches ? event.touches[0].pageY : null;
}

////////////////////////////////////////////////////////////////////////////

// scrollEnabler

////////////////////////////////////////////////////////////////////////////

scrollEnabler = function(event, element) {
    var elementCurrentScroll = element.scrollTop;
        elementScrollHeight = element.scrollHeight;
        elementClientHeight = element.clientHeight;
        fullBodyScroll = elementScrollHeight - elementClientHeight;
    if (elementCurrentScroll <= fullBodyScroll && elementCurrentScroll >= 0) {
        element.scrollTop = elementCurrentScroll + scrollDistance;
    }
}

////////////////////////////////////////////////////////////////////////////

// scrollAnimate

////////////////////////////////////////////////////////////////////////////

scrollAnimate = function(screen) {

    var app = document.querySelector('.app-main');
        screen = app.querySelector(screen);
        start = screen.querySelector('.start');
        explore = screen.querySelector('.explore');
        panelBody = explore.querySelector('.panel-body');
        barTitleSpan = explore.querySelector('.bar-title').querySelector('span');
        barSubtitleSpan = explore.querySelector('.bar-subtitle').querySelector('span');
        originalTitleSpan = barTitleSpan.innerHTML;
        originalSubtitleSpan = barSubtitleSpan.innerHTML;
        panelScroll = 0;
        panelIsFullyScrolledUp = true;
        currentRatio = 0;
        panelCurrentScroll = 0;
        checked = false;
        exploreTop = 0;
        measureIndex = app.querySelector('.measure-index');
        measureIndexB = app.querySelector('.measure-index-b');

    fetchVariables = function() {
        var exploreBoundingTop = explore.getBoundingClientRect().top;
            screenBoundingTop = screen.getBoundingClientRect().top;
            exploreTop = exploreBoundingTop - screenBoundingTop;
            originalExploreTop = exploreTop;
    }

    window.addEventListener('resize', function(event) {
        explore.removeAttribute('style');
        start.removeAttribute('style');
        fetchVariables();
        if (checked == true) {
            explore.style.top = 0;
            exploreTop = 0;
        }
    });

    screen.addEventListener('wheel', function(event) {
        scrollHandler(event);
        scrollAnimation(event);
    });

    screen.addEventListener('touchmove', function(event) {
        scrollHandler(event);
        scrollAnimation(event);
    });

    screen.addEventListener('touchstart', touchStartHandler);

    function scrollAnimation(event) {
        measureIndex.style.top = (100 * (1 - currentRatio)) + '%';
        panelCurrentScroll = panelBody.scrollTop;
        panelIsFullyScrolledUp = panelCurrentScroll == 0;

        if (panelIsFullyScrolledUp) {
            expectedScroll = exploreTop + -scrollDistance;
            exploreTop = (expectedScroll >= originalExploreTop) ? originalExploreTop : (expectedScroll <= 0) ? 0 : (exploreTop + -scrollDistance);
            explore.style.top = exploreTop + 'px';
            currentRatio = Math.round(100 * (exploreTop / originalExploreTop)) / 100;
            start.style.opacity = currentRatio;
        }

        if (exploreTop == 0) {
            checked = true;
            app.classList.add('activated');
            barTitleSpan.innerHTML = 'overview';
            barSubtitleSpan.innerHTML = 'down';
            scrollEnabler(event, panelBody);
            var currentScroll = panelBody.scrollTop / (panelBody.scrollHeight - panelBody.clientHeight);
            measureIndexB.style.top = (100 * currentScroll) + '%';
        } else if (exploreTop == originalExploreTop) {
            checked = false;
            app.classList.remove('activated');
            barTitleSpan.innerHTML = originalTitleSpan;
            barSubtitleSpan.innerHTML = originalSubtitleSpan;
        }
    }

    fetchVariables();

}

////////////////////////////////////////////////////////////////////////////

// dockToggler

////////////////////////////////////////////////////////////////////////////



dockToggler = function() {
    var app = document.querySelector('.app-main');
        tools = app.querySelectorAll('.tool-swatch');
        dock = app.querySelector('.panel-dock');
        screen = app.querySelector('[class*=screen-]');
        currentSwatch = undefined;
        toolsArray = [];
        previous = undefined;
        docked = false;
        swatches = ['cyan', 'magenta', 'yellow', 'black'];
        swatch = undefined;

    for (var i = 0; i < tools.length; i++) {
        var tool = tools[i];
        tool.addEventListener('click', function() {
            for (var i = 0; i < tools.length; i++) {
                if(this.isSameNode(tools[i])) {
                    swatch = swatches[i];
                }
            }
            if (docked) {
                if(!this.isSameNode(previous)) {
                    app.classList.remove(previousSwatch);
                    app.classList.add(swatch);
                    for (var k = 0; k < tools.length; k++) {
                        tools[k].classList.remove('activated');
                        this.classList.add('activated');
                    }
                } else {
                    this.classList.remove('activated');
                    app.classList.remove('docked');
                    docked = false;
                    app.removeAttribute('style');
                    screen.classList.remove('hidden');
                    dock.classList.remove('visible');
                    app.classList.remove(swatch);
                }
            } else {
                this.classList.add('activated');
                app.classList.add('docked');
                dock.classList.add('visible');
                docked = true;
                screen.classList.add('hidden');
                app.removeAttribute('style');
                app.classList.add(swatch);
            }
            previous = this;
            previousSwatch = swatch;
        });
    }
}

dockToggler();

////////////////////////////////////////////////////////////////////////////

// responsiveImages

////////////////////////////////////////////////////////////////////////////

responsiveImages = function(cardName) {
    var dppi = window.devicePixelRatio;
        cards = document.getElementsByClassName(cardName);
        status = 'all';
        currentImg = null;
        prevImgWidth = 0;
        scrollContainer = document.querySelector('.panel-body');
        scrollPosition = 0;

    finish = function(cardImg) {
        setTimeout(function() {
            cardImg.classList.remove('deactivated');
        }, 1000)
    }

    loadImage = function(cardImg, otherCardImgs) {
        var imgWidth = Math.ceil(parseInt(getComputedStyle(cardImg, null).getPropertyValue('width'), 10));
        if (imgWidth != prevImgWidth) { // Skip the image transormation if it is the same size as the prior
            var newWidth = imgWidth * dppi;
            if (cardImg.dataset.src) {
                var imgSrc = cardImg.dataset.src;
                var srcParse = imgSrc.split('upload/');
                for (var j = 0; j < srcParse.length; j++) {
                    var srcFirst = srcParse[0];
                    var srcLast = srcParse[1];
                    var srcType = srcLast.split('.')[1];
                    if(srcType === 'jpg') {
                        var imgSrc = srcFirst + 'upload/w_' + newWidth + '/' + srcLast;
                    }
                    cardImg.src = imgSrc;
                }
            }
        } else {
            finish(cardImg);
            for (var k = 0; k < otherCardImgs.length; k++) {
                finish(otherCardImgs[k]);
            }
        }
    }

    hoverReplicate = function() {
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if(card.classList.contains('hover')) {
                card.classList.toggle('hover');
            }
        }
        this.classList.toggle('hover');
    }

    queryMedia = function(cardImg, otherCardImgs) {
        if (status === 'all') {
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                var cardImg = card.querySelector('img');
                cardImg.classList.add('deactivated');
                loadImage(cardImg, otherCardImgs);
            }
        } else if (status === 'single') {
            cardImg.classList.add('deactivated');
            loadImage(cardImg, otherCardImgs);
        }
    }

    toggleMedia = function(card, cardImg, cardParent, otherCards, otherCardImgs) {
        prevImgWidth = Math.ceil(parseInt(getComputedStyle(cardImg, null).getPropertyValue('width'), 10));
        if (!cardParent.classList.contains('activated')) {
            scrollPosition = scrollContainer.scrollTop;
        }
        for (var i = 0; i < otherCards.length; i++) {
            otherCards[i].parentNode.classList.toggle('deactivated');
            otherCards[i].classList.add('deactivated');
        }
        cardParent.classList.toggle('activated');
        card.querySelector('.tool-shrink').classList.toggle('deactivated');
        if (status === 'all') {
            status = 'single';
            currentImg = cardImg;
        } else if (status === 'single') {
            status = 'all';
            currentImg = null;
        }
        for (var k = 0; k < otherCardImgs.length; k++) {
            otherCardImgs[k].classList.add('deactivated');
        }
        if (!cardParent.classList.contains('activated')) {
            scrollContainer.scrollTop = scrollPosition;
        } else {
            scrollContainer.scrollTop = 0;
        }
        queryMedia(cardImg, otherCardImgs);
    }

    for (var i = 0; i < cards.length; i++) {
        (function() {
            var card = cards[i];
            var otherCards = [];
            var otherCardImgs = [];
            for (var j = 0; j < cards.length; j++) {
                if (!cards[j].isSameNode(card)) {
                    otherCards.push(cards[j]);
                    var otherCardImg = cards[j].querySelector('img');
                    if (otherCardImg) {
                        otherCardImgs.push(otherCardImg);
                    }
                }
            }
            var cardImg = card.querySelector('img');
            var cardParent = card.parentNode;
            var toolExpand = card.querySelector('.tool-expand');
            var toolShrink = card.querySelector('.tool-shrink');
            var tools = [];
            if (toolExpand && toolShrink) {
                tools.push(toolExpand, toolShrink);
            }
            if (cardImg) {
                cardImg.addEventListener('load', function() {
                    finish(cardImg);
                    for (var k = 0; k < otherCardImgs.length; k++) {
                        finish(otherCardImgs[k]);
                    }
                });
            }
            card.addEventListener('touchstart', hoverReplicate);
            if (tools) {
                for(var t = 0; t < tools.length; t++) {
                    var tool = tools[t];
                    tool.addEventListener('click', function() {
                        toggleMedia(card, cardImg, cardParent, otherCards, otherCardImgs);
                    });
                }
            }
        })();
    }

    window.addEventListener('resize', function() {
        queryMedia(currentImg);
    });

    queryMedia(status);
}
