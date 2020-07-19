<template>
    <div class="Index">
        <div class="layout">
            <img src="../assets/images/logo.jpg"
                 alt="">
            <div class="search">
                <el-input placeholder="请输入内容"
                          v-model="val" @input="getVal">
                </el-input>
                <el-button icon="el-icon-search"
                           @click="go"></el-button>
            </div>
            <ul class="list" v-show="show">
                <li v-for="(item,i) in list" :key="i" @click="actived(item.keyword)">
                    {{item.keyword}}
                </li>
            </ul>
            <div class="choice">   <span class="tit">选择偏移量：</span> <el-radio-group v-model="radio">
                
                <el-radio :label="0">0</el-radio>
                <el-radio :label="1">1</el-radio>
                <el-radio :label="2">2</el-radio>
                <el-radio :label="3">3</el-radio>
                <el-radio :label="4">4</el-radio>
            </el-radio-group></div>
         
              
        </div>
        <footer>
            Copyright © 2020 solar. All Rights Reserved. solar 版权所有
        </footer>
    </div>
</template>

<script>
export default {
	name: 'Index',
	data() {
		return {
			val: '',
            radio: 0,
            list:[],
            show:false
		}
	},
	components: {},
	methods: {
        getVal(e){
            let that=this;
            	this.$http
				.get(`/api/search/api/sug/?keyword=${e}`)
				.then((res) => {

                    that.list=res.data.data
                    if(res.data.data){
                        that.show=true
                    }
				})

        },
		go() {
			if (this.val !== '') {
				this.$router.push({
					path: '/content',
					query: {
						val: this.val,
						radio: this.radio,
					},
				})
			}
        },
        actived(e){
            this.val=e;
             this.show=false
        }
	},
}
</script>

<style lang="scss">
@import '../assets/css/_mixin.scss';
.Index {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
	.layout {
		width: 600px;
		margin: 100px auto 0;
		@include box_flex;
		@include direction(column);
		@include align;
		overflow: hidden;
		//height: 400px;
		.search {
			width: 100%;
			@include box_flex;
			margin-top: 50px;
			@include justify(space-between);
			.el-input {
				margin-right: 10px;
			}
		}
        .list{
          align-self: flex-start;
            width:534px;
            border:solid 1px #ccc;
            li{
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: left;
                padding-left: 10px;
                font-size: 14px;
    cursor: pointer;

            }
            li:hover{
                color:#409EFF;
            }
        }
        .choice{
            width: 100%;
            height: 40px;
            display: flex;
            margin:20px 0;
            @include align;
           .tit{
               font-size: 16px;
           }
        }
	
	}
	footer {
		width: 100%;
		height: 40px;
		position: absolute;
		left: 0;
		bottom:-30px;
        text-align: center;
        z-index: 999;
	}
}
</style>
