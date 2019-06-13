;(function(local) {
  let PnF = {
    fragment(selector, options) {
      let needRAF = true
      const defaultOptions = {
        maxRotate: 120,
        homeUrl: '',
        homeLabel: 'Home',
        layers: [
          {
            offset: 50,
            fragments: 'Page Not Found'.split(' '),
            color: 'palevioletred'
          },
          { offset: 25, fragments: 35, color: 'burlywood' },
          { offset: 12, fragments: 55, color: 'powderblue' }
        ]
      }

      options = Object.assign({}, defaultOptions, options)
      let $container = document.querySelector(selector)
      $container.classList.add('fragment-container')
      // link
      if (options.homeUrl) {
        let $link = document.createElement('a')
        $link.className = `fragment-home`
        $link.href = options.homeUrl
        $link.style.setProperty('z-index', 200)
        $link.innerText = options.homeLabel
        $container.appendChild($link)
      }

      let $layers = options.layers.map((layer, idx) => {
        // init layer
        let $div = document.createElement('div')
        $div.className = `fragment-layer-${idx + 1}`
        $div.style.setProperty('--bg-color', layer.color)
        $div.style.setProperty('z-index', 100 - idx)
        $container.appendChild($div)
        // init fragments
        let w = $div.clientWidth
        let h = $div.clientHeight
        if (layer.fragments instanceof Array) {
          layer.fragments.map(str => {
            let $fragment = createFragment(w, h, options.maxRotate, str)
            $div.appendChild($fragment)
          })
        } else if (typeof layer.fragments === 'number') {
          for (let i = 0; i < layer.fragments; ++i) {
            let $fragment = createFragment(w, h, options.maxRotate)
            $div.appendChild($fragment)
          }
        }
        return $div
      })

      let w = local.innerWidth
      let h = local.innerHeight
      local.onresize = function resize() {
        w = local.innerWidth
        h = local.innerHeight
      }
      local.addEventListener('mousemove', e => {
        let offsetX = 0.5 - e.clientX / w
        let offsetY = 0.5 - e.clientY / h
        if (needRAF) {
          needRAF = false
          local.requestAnimationFrame(function update() {
            $layers.forEach(($layer, idx) => {
              let offset = options.layers[idx].offset
              // prettier-ignore
              let transform = `translate3d(${offsetX * offset}px, ${offsetY * offset}px, 0)`
              $layer.style.transform = transform
            })
            needRAF = true
          })
        }
      })

      function createFragment(w, h, r, str) {
        let $fragment = document.createElement('div')
        let top = (Math.random() * h * 0.8 + h * 0.1) | 0
        let left = (Math.random() * w * 0.8 + w * 0.1) | 0
        // rotate between (-r/2) deg to (r/2) deg
        let rotate = (Math.random() * r - r / 2) | 0
        $fragment.className = 'fragment'
        if (str) {
          $fragment.innerText = str
        }
        $fragment.style.setProperty('position', 'absolute')
        $fragment.style.setProperty('background-color', 'var(--bg-color)')
        $fragment.style.setProperty('top', `${top}px`)
        $fragment.style.setProperty('left', `${left}px`)
        $fragment.style.setProperty('transform', `rotateZ(${rotate}deg)`)
        return $fragment
      }
    }
  }
  local.PnF = PnF
})(window)
