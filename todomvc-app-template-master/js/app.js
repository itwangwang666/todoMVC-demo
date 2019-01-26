(function (window) {
	new Vue({
		el: '.todoapp',
		data: {
			id: 0,
			title: '',
			num: 0,
			focusState: '',
			editData: '',
			list: [
				{ id: 1, title: '买菜', completed: false, flag: false },
				{ id: 2, title: '买肉', completed: false, flag: false },
				{ id: 3, title: '买大饼', completed: false, flag: false }
			]
		},
		methods: {
			add() {		//新增方法
				let list = JSON.parse(localStorage.getItem('title') || '[]')
				this.id = this.id + 1
				list.push({ id: this.id, title: this.title, completed: false, flag: false })
				localStorage.setItem('title', JSON.stringify(list))
				this.id = this.title = this.completed = ''
				this.countNum()
				this.num = this.num
				this.getTitle()
			},
			getTitle() {		//获取localStorage数据渲染页面
				this.list = JSON.parse(localStorage.getItem('title') || '[]')
			},
			countNum() {		//计算未完成的数量
				let newArr = []
				this.list.forEach(item => {
					if (item.completed == false) {
						newArr.push(item)
					}
				})
				this.num = newArr.length
				return this.num
			},
			checkNum(i) {		//选择是否完成
				let list = JSON.parse(localStorage.getItem('title') || '[]')
				list.forEach((item, index) => {
					if (index == i) {
						item.completed = !item.completed
					}
				})
				localStorage.setItem('title', JSON.stringify(list))
				this.getTitle()
				this.countNum()
				this.num = this.num
			},
			checkAll() {		//全选,操作全部完成或者全部未完成
				let list = JSON.parse(localStorage.getItem('title') || '[]')
				let isCheck = list.every(function (item, index) {
					return item.completed == true
				})
				if (isCheck) {
					list.forEach(item => {
						item.completed = false
					})
				} else {
					list.forEach(item => {
						item.completed = true
					})
				}
				localStorage.setItem('title', JSON.stringify(list))
				this.getTitle()
				this.countNum()
				this.num = this.num
			},
			showInfo(i) {		//双击编辑时,显示对应的数据title
				this.list.forEach((item, index) => {
					if (index == i) {
						this.editData = item.title
						item.flag = true
					} else {
						item.flag = false
					}
				})

				this.focusState = true
			},
			edit(i) {		//编辑完成时
				this.list.forEach((data, index) => {
					if (index === i) {
						data.title = this.editData
					}
					data.flag = false
				})
				localStorage.setItem('title', JSON.stringify(this.list))
			},
			editCom(i) {	//编辑完成失去焦点
				this.focusState = false
				this.edit(i)
			},
			del(index) {	//删除数据
				let list = JSON.parse(localStorage.getItem('title') || '[]')
				list.forEach((item, i) => {
					if (i == index) {
						list.splice(index, 1)
					}
				})
				localStorage.setItem('title', JSON.stringify(list))
				this.getTitle()
				this.countNum()
				this.num = this.num
			},
			clearCom() {	//清除已完成的数据
				let arr = []
				let list = JSON.parse(localStorage.getItem('title') || '[]')
				list.forEach((item) => {
					if (item.completed == false) {
						arr.push(item)
					}
				})
				localStorage.setItem('title', JSON.stringify(arr))
				this.getTitle()

			},
			allCom() {		//渲染所有的数据,已完成和未完成
				this.getTitle()
			},
			activeCom(){	//只渲染被选中的数据,只显示已经完成的任务,并没有真正删除localStorage里面的数据
				this.getTitle()
				let arr = []
				this.list.forEach((item, i) => {
					if (item.completed == true) {
						arr.push(item)
					}
				})
				this.list = arr
			},
			com() {		//只显示未完成的数据
				this.getTitle()
				let arr = []
				this.list.forEach((item, index) => {
					if (item.completed == false) {
						arr.push(item)
					}
				})
				this.list = arr
			}
		},
		created() {		//页面加载完成,就渲染数据
			this.getTitle()
			this.countNum()
			this.num = this.num
		},
		directives: {	//自定义指令,自动获取焦点
			focus: {
				update: function (el, { value }) {
					if (value) {
						el.focus()
					}
				}
			}
		},
	})
})(window);
