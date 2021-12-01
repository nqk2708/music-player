const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const togglePlay = $('.btn-toggle-play')
const audio = $('#audio')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const player = $('.player')
const song = $('.playlist .song')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const playlist = $('.playlist')
const volume = $('#volume')
const volumeBtn = $('.vol-btn')
const volControl = $('.vol-control')
const dashBoard = $('.dashboard')


const app = {
    songs: [
        {
            name: 'Hoa Nở Không Màu',
            singer: 'Hoài Lâm',
            path: './assets/songs/HoaNoKhongMau1-HoaiLam-6281704.mp3',
            image:"./assets/images/HoaNoKhongMau.jpg"
        },{
            name: 'Buồn Làm Chi Em Ơi',
            singer: 'Hoài Lâm',
            path: './assets/songs/BuonLamChiEmOi1-HoaiLam-6297318.mp3',
            image:"./assets/images/BuonLamChiEmOi.jpg"
        },{
            name: 'Như Những Phút Ban Đầu',
            singer: 'Hoài Lâm',
            path: './assets/songs/Nhu Nhung Phut Ban Dau - Hoai Lam (NhacPro.net).mp3',
            image:"./assets/images/NhuNhungPhutBanDau.jpg"
        },
        {
            name: 'Có Khi',
            singer: 'Hoài Lâm',
            path: './assets/songs/Co-Khi-Hoai-Lam.mp3',
            image:"./assets/images/BuonLamChiEmOi.jpg"
        },
        {
            name: 'Một Thời Đã Xa',
            singer: 'Hoài Lâm',
            path: './assets/songs/Mot-thoi-da-xa-Hoai-Lam.mp3',
            image:"./assets/images/MotThoiDaXa.jpg"
        },
        {
            name: 'Thương Nhớ Người Dưng',
            singer: 'Hoài Lâm',
            path: './assets/songs/Thuong-nho-nguoi-dung-Hoai-Lam.mp3',
            image:"./assets/images/MotThoiDaXa.jpg"
        },      {
            name: 'Nỗi Nhớ Mang Tên Mình',
            singer: 'Hoài Lâm',
            path: './assets/songs/Noi-Nho-Mang-Ten-Minh.mp3',
            image:"./assets/images/NhuNhungPhutBanDau.jpg"
        },{
            name: 'Mẹ',
            singer: 'Hoài Lâm',
            path: './assets/songs/Me-Hoai-Lam.mp3',
            image:"./assets/images/NhuNhungPhutBanDau.jpg"
        },{
            name: 'Trộm Nhìn Nhau',
            singer: 'Hoài Lâm',
            path: './assets/songs/Trom-Nhin-Nhau-Hoai-Lam.mp3',
            image:"./assets/images/TromNhinNhau.jpg"
        },{
            name: 'Xin Lỗi Vì Đã Yêu Nhau',
            singer: 'Hoài Lâm',
            path: './assets/songs/Xin-Loi-Vi-Da-Yeu-Nhau-Hoai-Lam.mp3',
            image:"./assets/images/MotThoiDaXa.jpg"
        },
        {
            name: 'Có Khi Nào Rời Xa',
            singer: 'Hoài Lâm',
            path: './assets/songs/Co-Khi-Nao-Roi-Xa-Hoai-Lam.mp3',
            image:"./assets/images/BuonLamChiEmOi.jpg"
        },
        {
            name: 'Về Đâu Mái Tóc Người Thương',
            singer: 'Hoài Lâm',
            path: './assets/songs/Ve-Dau-Mai-Toc-Nguoi-Thuong-Hoai-Lam.mp3',
            image:"./assets/images/NhuNhungPhutBanDau.jpg"
        },
        {
            name: 'Nếu Như Là Định Mệnh',
            singer: 'Hoài Lâm, Binz',
            path: './assets/songs/Neu-Nhu-La-Dinh-Menh-Hoai-Lam-Binz.mp3',
            image:"./assets/images/MotThoiDaXa.jpg"
        },
    ],
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMuted: false,
    currentIndex : 0,

    renderSongs: function() {
        const htmls = this.songs.map(function(song, index) {
            return`            
            <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `                    
        })
        const playlistDarkMode =
        `<div class="playlist-darkmode">
            <h3 class="playlist__label">Playlist</h3>
            <div class="playlist-darkmode-btn">
                <i class="fas fa-toggle-on playlist-darkmode-btn--on"></i>
                <i class="fas fa-toggle-off playlist-darkmode-btn--off"></i>
            </div>
        </div>`
        $('.playlist').innerHTML = playlistDarkMode.concat(htmls.join(''))
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        const cdWidth = cd.offsetWidth
        const _this = this

        //Scrolling
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xử lý khi nhấn play
        togglePlay.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            } else {                
                audio.play()
            }
        }

        //Khi bài hát được play/pause
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()            
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        
        //Khi thanh volume thay đổi
        volume.oninput = function (e) {
            audio.volume = e.target.value / 100
            if (audio.volume === 0) {
            volControl.classList.add('mute')
            }
            else {
                volControl.classList.remove('mute')
            }           
        }

        
        //Khi nhấn btn volume
        volumeBtn.onclick = function() {
            _this.isMuted = !_this.isMuted
            volControl.classList.toggle('mute', _this.isMuted)
            if(_this.isMuted) {
                audio.volume = 0
            }
            else {
                audio.volume = volume.value / 100
            }
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {            
            const curTime = $('.curTime')
            const durTime = $('.durationTime')

            let newIndex = _this.currentIndex

            curTime.textContent = app.secondsToMs(this.currentTime)
            if(this.duration){
                durTime.textContent = app.secondsToMs(this.duration)
            }

            if (audio.duration) {
                progress.value = Math.floor(audio.currentTime / audio.duration * 100)
            }
            if (audio.currentTime === audio.duration) {
                if (!_this.isRepeat) {
                    if (_this.isRandom) {
                        _this.randomSong()
                    } else {
                        _this.nextSong()
                    }
                } else {
                    _this.currentIndex = newIndex
                    _this.loadCurrentSong()
                }
                _this.renderSongs()
                audio.play()                
            }
        }

        //Xử lý khi tua bài hát
        progress.oninput = function(e) {
            audio.currentTime = e.target.value * audio.duration / 100            
        }
        
        //Xử lý quay đĩa
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }, 
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        //Xử lý khi Next/Prev
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.renderSongs()

            //Xử lý ScrollIntoView
        setTimeout(() => {
            if (this.currentIndex <= 3) {
                $('.song.active').scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
            } else {
                $('.song.active').scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                });
            }}
        ,300)    
        }

        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.renderSongs()

            //ScrollIntoView
            setTimeout(() => {
                if (this.currentIndex <= 3) {
                    $('.song.active').scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    });
                } else {
                    $('.song.active').scrollIntoView({
                      behavior: 'smooth',
                      block: 'end',
                    });
                }}
            ,250)    
        }

        //Xử lý khi nhấn Random
        randomBtn = $('.btn-random')
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom            
            randomBtn.classList.toggle('active')
        }

        //Xử lý khi nhấn Repeat
        repeatBtn = $('.btn-repeat')
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active')
        }
        
        // Lắng nghe khi ấn vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                //Xử lý khi nhấn vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.renderSongs()                    
                    audio.play()
                }
                //Xử lý khi nhấn vào option
                if (e.target.closest('.option')) {

                }
            }
        }   
        
        // Dark Mode        
        const darkModeToggle = $('.playlist-darkmode-btn')
        
        darkModeToggle.onclick = function () {
            playlist.classList.toggle('darkmode--active')
            dashBoard.classList.toggle('darkmode--active')
        }            
        
    },

    secondsToMs: function(d){
        d = Number(d)
        var m = Math.floor(d % 3600 / 60)
        var s = Math.floor(d % 3600 % 60)
        var mDisplay = m > 9 ? m : `0${m}`
        var sDisplay = s > 9 ? s : `0${s}`
        return `${mDisplay} : ${sDisplay}`
    },

    loadCurrentSong: function() {    
        const singer = $('header h5')
        heading.textContent = this.currentSong.name
        singer.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path                
    },

    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songs.length-1
        }
        this.loadCurrentSong()
    },

    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        //định nghĩa thuộc tính cho obj
        this.defineProperties()        

        //Tải thông tin bài hát đầu tiên vào UI khi chạy app
        this.loadCurrentSong()

        //render playlist
        this.renderSongs()

        //lắng nghe sự kiện
        this.handleEvents()
    }
}

app.start()
