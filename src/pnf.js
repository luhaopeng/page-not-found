;(function(local) {
  let PnF = {
    fragment(selector, options) {
      const defaultOptions = {
        maxRotate: 120,
        layers: [
          {
            offset: 50,
            fragments: '页面不存在'.split(''),
            color: 'palevioletred'
          },
          { offset: 25, fragments: 35, color: 'burlywood' },
          { offset: 12, fragments: 55, color: 'powderblue' }
        ]
      }

      options = Object.assign(defaultOptions, options)
      let $container = document.querySelector(selector)
      $container.classList.add('fragment-container')

      options.layers.map((layer, idx) => {
        // init layer
        let $div = document.createElement('div')
        $div.className = `fragment-layer-${idx + 1}`
        $div.setAttribute('data-offset', layer.offset)
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
      })

      local.addEventListener('mousemove', e => {
        let w = e.currentTarget.innerWidth
        let h = e.currentTarget.innerHeight
        let offsetX = 0.5 - e.pageX / w
        let offsetY = 0.5 - e.pageY / h
        let $layers = document.querySelectorAll('div[class*="fragment-layer-"')
        Array.from($layers).map($layer => {
          let offset = $layer.getAttribute('data-offset')
          let transform = `
            translateX(${offsetX * offset}px)
            translateY(${offsetY * offset}px)
          `
          $layer.style.setProperty('transform', transform)
        })
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
