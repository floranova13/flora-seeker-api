this.window.onload = () => {
  Array.from(this.document.getElementsByClassName('request-entry')).forEach(div => {
    if (div.getAttribute('data-inactive')) div.classList.add('inactive')
    else div.addEventListener('click', () => changeRoute(div.getAttribute('data-value').split(' ')))
  })
  Array.from(this.document.getElementsByClassName('nav-item')).forEach(div => {
    if (div.getAttribute('data-inactive')) div.classList.add('inactive')
    else div.addEventListener('click', () => changeEntity(div.getAttribute('data-value').split(' ')))
  })
  Array.from(this.document.getElementsByClassName('family-item')).forEach(div => {
    if (div.getAttribute('data-inactive')) div.classList.add('inactive')
    else div.addEventListener('click', () => changeFamily(div.getAttribute('data-value').split(' ')))
  })
}

const changeRoute = val => {
  this.window.location.replace(val.length > 3
    ? `${val[0]}collection/${val[2]}/${val[3]}`
    : `${val[0]}${val[1]}/${val[2]}`)
}

const changeEntity = val => this.window.location.replace(`${val[0]}${val[1]}/0`)

const changeFamily = val => this.window.location.replace(`${val[0]}collection/${val[1]}/0`)

/*
const showRequestInfo = val => {
  if(val.length > 3)
}
*/
