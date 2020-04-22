this.window.onload = () => {
  Array.from(this.document.getElementsByClassName('request-entry')).forEach(div => {
    div.addEventListener('click', () => changeRoute(div.getAttribute('data-value').split(' ')))
  })
  Array.from(this.document.getElementsByClassName('nav-item')).forEach(div => {
    div.addEventListener('click', () => changeEntity(div.getAttribute('data-value')))
  })
}

const changeRoute = val => this.window.location.replace(`http://localhost:16361/documentation/${val[0]}/${val[1]}`)

const changeEntity = val => this.window.location.replace(`http://localhost:16361/documentation/${val}/0`)
