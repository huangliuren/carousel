
const nextIndex = function(slide, offset) {
    // let self = button
    // let slide = self.closest('.ren-slide')
    // 得到图片总数和当前图片下标
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    // log('numberOfImgs', numberOfImgs)
    let activeIndex = Number(slide.dataset.active)
    // 求出下一张图片的 id
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

const bindEventSlide = function() {
    let selector = '.ren-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        let self = event.target
        // 找到 slide div
        let slide = self.parentElement
        // 上一张图片的 offset 是 -1
        // 下一张图片的 offset 是 1
        let offset = Number(self.dataset.offset)
        // 算出下一张图片的 index
        let index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

const showImageAtIndex = function(slide, index) {
    let nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    let className = 'ren-active'
    removeClassAll(className)
    let nextSelector = '#id-renimage-' + String(nextIndex)
    let img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    let indicatorClassName = 'ren-white'
    removeClassAll(indicatorClassName)
    let indicatorSelector = '#id-indicator-' + String(nextIndex)
    let indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}

const bindEventIndicator = function() {
    let selector = '.ren-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        // log('index', index, typeof index)
        let slide = self.closest('.ren-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

const bindEvents = function() {
    bindEventSlide()
    bindEventIndicator()
}

const playNextImage = function() {
    let slide = e('.ren-slide')
    // 默认 offset 是 1
    let index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

let clockId
const autoPlay = function() {
    clockId = setInterval(function() {
        playNextImage()
    }, 2000)
}

const bindEventMouseEnter = function () {
    let slideMouse = e('.ren-slide')
    slideMouse.addEventListener('mouseenter', function (event) {
        log('mouseenter pic')
        clearInterval(clockId)
    })
}

const bindEventMouseleave = function () {
    let slideMouse = e('.ren-slide')
    slideMouse.addEventListener('mouseleave', function (event) {
        log('mouseleave')
        clockId = setInterval(function() {
            playNextImage()
        }, 2000)
    })
}

const timerDemo = function() {

}

const __main = function() {
    bindEvents()
    autoPlay()
    timerDemo()
    bindEventMouseEnter()
    bindEventMouseleave()
}

__main()
