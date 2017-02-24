console.log('hello') // sanity checker

const formText = document.querySelector('#inputText')
const clear = document.querySelector('#clear')
const post = document.querySelector('#postBtn')
const postList = document.querySelector('#postOut')

const defaultOut = `<p> word count : 0 // character count : 0 </p>`

function wordSpilt(str) {
  str = str.replace(/[.,\/#!$%\^&\*;:{}=`~()\"]/g,'')
  str = str.replace(/\s{2,}/g,' ')
  str = str.replace(/\s+$/, '')
  return str.split(' ')
}

function reset() {
  formText.value = ''
  infoOut.innerHTML = defaultOut
  formText.focus()
}

function timeStamp() {
  const now = new Date()
  let hours = now.getHours()
	let minutes = now.getMinutes()
  let meridiem = hours > 12 ? "pm" : "am"

  if (hours === 0) hours = 12
  if (hours > 12) hours = hours - 12
	if (hours < 10) hours = `&nbsp;${hours}`
	if (minutes < 10) minutes = `0${minutes}`

  return `${hours}:${minutes} ${meridiem}`
}

function extract(node) {
  const nodes = Array.from(node.childNodes).filter(f => f.nodeName === '#text')
  return nodes.length ? nodes[0].textContent.trim() : ''
}

function ProcessText(str) {
  this.text = str
  this.words = wordSpilt(str)
  this.charSplt = str.split('')
  this.wordCount = this.text.length === 0 ? 0 : this.words.length
  this.time = timeStamp()
  this.textInfo = () => `<p> word count : ${this.wordCount} // character count : ${this.text.length}</p>`
  this.textOut = () => `<li class="posts__item">${this.text}<span class="post__timestamp">${this.time}</span><span class="post__edit">✎</span><span class="post__remove">x</span></li>`
  this.textEdited = () => `<li class="posts__item">${this.text}<span class="post__timestamp">edited ${this.time}</span><span class="post__edit">✎</span><span class="post__remove">x</span></li>`
}

document.addEventListener('DOMContentLoaded', function() {

  let postArr = []

  formText.addEventListener('input', function() {
    const info = new ProcessText(formText.value)
    infoOut.innerHTML = info.textInfo()
  })

  clear.addEventListener('click', reset)

  post.addEventListener('click', function() {
    const info = new ProcessText(formText.value)
    if (info.wordCount > 0) {
      postArr.push(info.textOut())
      postList.innerHTML = postArr.join(``)
      reset()
    } else {
      alert('There is nothing here?')
    }
  })

  postList.addEventListener('click', function(e) {
    const toMatch = e.target.outerHTML
    if (e.target.className === 'posts__item') {
      e.target.lastElementChild.style.visibility = 'visible'
      e.target.lastElementChild.previousElementSibling.style.visibility = 'visible'

      e.target.lastElementChild.addEventListener('click', function() {
        postArr.splice(postArr.indexOf(toMatch), 1)
        e.target.remove()
      })

      e.target.lastElementChild.previousElementSibling.addEventListener('click', function() {
        e.target.setAttribute('contenteditable','true')
        e.target.firstElementChild.setAttribute('contenteditable','false')
        e.target.lastElementChild.setAttribute('contenteditable','false')
        e.target.lastElementChild.previousElementSibling.setAttribute('contenteditable','false')
        e.target.lastElementChild.previousElementSibling.innerHTML = '✓'
        e.target.focus()

        e.target.lastElementChild.previousElementSibling.addEventListener('click', function() {
          e.target.setAttribute('contenteditable','false')
          e.target.lastElementChild.previousElementSibling.innerHTML = '✎'
          e.target.lastElementChild.style.visibility = 'hidden'
          e.target.lastElementChild.previousElementSibling.style.visibility = 'hidden'
          const info = new ProcessText(extract(e.target))
          postArr.splice(postArr.indexOf(toMatch), 1, info.textEdited())
          postList.innerHTML = postArr.join(``)
          formText.focus()
        })
      })
    }
  })
})
