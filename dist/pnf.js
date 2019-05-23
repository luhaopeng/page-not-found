"use strict";

;

(function (local) {
  var PnF = {
    fragment: function fragment(selector, options) {
      var defaultOptions = {
        maxRotate: 120,
        layers: [{
          offset: 50,
          fragments: '页面不存在'.split(''),
          color: 'palevioletred'
        }, {
          offset: 25,
          fragments: 35,
          color: 'burlywood'
        }, {
          offset: 12,
          fragments: 55,
          color: 'powderblue'
        }]
      };
      options = Object.assign(defaultOptions, options);
      var $container = document.querySelector(selector);
      $container.classList.add('fragment-container');
      options.layers.map(function (layer, idx) {
        // init layer
        var $div = document.createElement('div');
        $div.className = "fragment-layer-".concat(idx + 1);
        $div.setAttribute('data-offset', layer.offset);
        $div.style.setProperty('--bg-color', layer.color);
        $div.style.setProperty('z-index', 100 - idx);
        $container.appendChild($div); // init fragments

        var w = $div.clientWidth;
        var h = $div.clientHeight;

        if (layer.fragments instanceof Array) {
          layer.fragments.map(function (str) {
            var $fragment = createFragment(w, h, options.maxRotate, str);
            $div.appendChild($fragment);
          });
        } else if (typeof layer.fragments === 'number') {
          for (var i = 0; i < layer.fragments; ++i) {
            var $fragment = createFragment(w, h, options.maxRotate);
            $div.appendChild($fragment);
          }
        }
      });
      local.addEventListener('mousemove', function (e) {
        var w = e.currentTarget.innerWidth;
        var h = e.currentTarget.innerHeight;
        var offsetX = 0.5 - e.pageX / w;
        var offsetY = 0.5 - e.pageY / h;
        var $layers = document.querySelectorAll('div[class*="fragment-layer-"');
        Array.from($layers).map(function ($layer) {
          var offset = $layer.getAttribute('data-offset');
          var transform = "\n            translateX(".concat(offsetX * offset, "px)\n            translateY(").concat(offsetY * offset, "px)\n          ");
          $layer.style.setProperty('transform', transform);
        });
      });

      function createFragment(w, h, r, str) {
        var $fragment = document.createElement('div');
        var top = Math.random() * h * 0.8 + h * 0.1 | 0;
        var left = Math.random() * w * 0.8 + w * 0.1 | 0; // rotate between (-r/2) deg to (r/2) deg

        var rotate = Math.random() * r - r / 2 | 0;
        $fragment.className = 'fragment';

        if (str) {
          $fragment.innerText = str;
        }

        $fragment.style.setProperty('position', 'absolute');
        $fragment.style.setProperty('background-color', 'var(--bg-color)');
        $fragment.style.setProperty('top', "".concat(top, "px"));
        $fragment.style.setProperty('left', "".concat(left, "px"));
        $fragment.style.setProperty('transform', "rotateZ(".concat(rotate, "deg)"));
        return $fragment;
      }
    }
  };
  local.PnF = PnF;
})(window);