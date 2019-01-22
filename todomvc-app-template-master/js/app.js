(function (window) {
	new Vue({
		el: '.todoapp',
		data: {
			id: 0,
			title: '',
			num:0,
			focusState:'',
			editData:'',
			list: [
				{ id: 1, title: '买菜', completed: false, flag: false},
				{ id: 2, title: '买肉', completed: false, flag: false},
				{ id: 3, title: '买大饼', completed: false, flag: false }
			]
		},
		methods: {
			add() {
				this.id = this.id + 1
				this.list.push({ id: this.id, title: this.title, completed: false ,flag:false})
				this.id = this.title = this.completed = ''
				this.countNum()
				this.num = this.num
			},
			countNum(){
				let newArr = []
				this.list.forEach(item => {
					if(item.completed == false){
						newArr.push(item)
					}
				})
				this.num = newArr.length
				return this.num
			},
			checkNum(item){
				item.completed = !item.completed
				this.countNum()
				this.num = this.num
			}, 
			checkAll(){
				let isCheck = this.list.every(function (item, index) {
					return item.completed == true
				})
				if (isCheck){
					this.list.forEach(item => {
						item.completed = false
					})
				}else{
					this.list.forEach(item => {
					item.completed = true 
				})
				}
				this.countNum()
				this.num = this.num
			},
			showInfo(item){
				
				this.editData
				this.list.forEach((data,index)=>{
					if(data.id == item.id){
						this.editData = data.title
						data.flag = true
					}else{
						data.flag = false
					}
				})

				this.focusState = true
			},
			edit(i){
				this.list.forEach((data,index)=>{
					if(index === i){
						data.title = this.editData
					}
					data.flag = false
				})
				
			},
			editCom(i){
				this.focusState = false
				this.edit(i)
			},
			del(index){
				this.list.splice(index,1)
				this.countNum()
				this.num = this.num
			},
			clearCom(){
				let arr = []
				this.list.forEach((item, index)=>{
					if(item.completed == false){
						arr.push(item)
					}
				})
				this.list = arr
			},
			com(){
				let arr = []
				this.list.forEach((item, index) => {
					if (item.completed == true) {
						arr.push(item)
					}
				})
				this.list = arr
			}
		},
		created(){
			this.countNum()
			this.num = this.num
		},
		directives: {
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
