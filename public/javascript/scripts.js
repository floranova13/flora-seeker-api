this.window.onload = () => {
  const title = this.document.getElementById('section-title')

  title.innerHTML = (title.getAttribute('data-section')[0].toUpperCase() + title.getAttribute('data-section').slice(1))

  addClickEvents('request-entry', showRequestInfo, true)
  addClickEvents('nav-item', changeSection, false)
  addClickEvents('family-item', changeFamily, false)
}

const addClickEvents = (className, func, isRequest) => {
  Array.from(this.document.getElementsByClassName(className)).forEach(div => {
    manageActiveStatus(div, div.getAttribute('data-inactive'), 'inactive')
    div.addEventListener('click', () => func(isRequest ? div : div.getAttribute('data-value').split(' ')))
  })
}

const showRequestInfo = el => {
  Array.from(this.document.getElementsByClassName('request-entry')).forEach(div => {
    manageActiveStatus(div, div.isSameNode(el), 'inactive')
    div.addEventListener('click', () => showRequestInfo(div))
  })

  const methodEl = this.document.getElementById('method')
  const routeEl = this.document.getElementById('route')
  const headersEl = this.document.getElementById('headers')
  const bodyEl = this.document.getElementById('body')
  const descriptionEl = this.document.getElementById('description')

  manageActiveStatus(this.document.getElementById('headers-row'), !el.getAttribute('data-headers'), 'hidden')
  manageActiveStatus(this.document.getElementById('body-row'), !el.getAttribute('data-body'), 'hidden')

  methodEl.innerHTML = el.getAttribute('data-method')
  routeEl.innerHTML = el.getAttribute('data-route')
  headersEl.innerHTML = el.getAttribute('data-headers')
  bodyEl.innerHTML = el.getAttribute('data-body')
  descriptionEl.innerHTML = el.getAttribute('data-description')
}

const changeSection = val => this.window.location.replace(`${val[0]}${val[1]}`)

const changeFamily = val => this.window.location.replace(`${val[0]}collection/${val[1]}`)

const manageActiveStatus = (el, inactive, classStr) => {
  if (inactive) el.classList.add(classStr)
  else el.classList.remove(classStr)
}
