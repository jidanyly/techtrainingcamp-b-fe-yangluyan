<template>
    <div class="Content">
        <div class="layout">
            <div class="search">
                <img src="../assets/images/logo.jpg"
                     alt="" />

            </div>
            <div class="bottom">
                <div class="cont">
                    <p>
                        共找到<span>{{ total }}</span>条信息
                    </p>
                    <div class="art"
                         v-if="!currentList">
                        什么都没有
                    </div>
                    <div class="art"
                         v-if="currentList&&currentList.length!==0">
                        <el-card class="box-card"
                                 v-for="item in currentList"
                                 :key="item.id">
                            <div slot="header"
                                 class="clearfix">
                                <a class="titTop"
                                   :href="item.link_url"
                                   v-html="item.title"></a>
                                <!-- <el-button style="float: right; padding: 3px 0"
                                           type="text"
                                           @click="relativeLink(item.id)">相关链接</el-button> -->
                            </div>
                            <!-- <div class="text item titcen"
                                 v-html="item.title">
                            </div> -->
                            <div class="text item author">
                                 作者:{{item.user_name}}
                            </div>
                            <div class="text item summary"
                                 v-html="item.time">

                            </div>
                            <div class="text item content"
                                 v-html="item.description">
                            </div>
                        </el-card>
                    </div>

                    <el-pagination @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   @prev-click="prevClick"
                                   @next-click="nextClick"
                                   :page-size="10"
                                   :total="total"
                                   layout=" prev, pager, next"></el-pagination>
                </div>
                <!-- <div class="right">
                    <el-card>
                        <div slot="header"
                             class="clearfix">
                            <span>Related words</span>
                        </div>
                        <div v-for="(itm, index) in related"
                             :key="index"
                             class="text item">
                            {{ itm }}
                        </div>
                    </el-card>
                    <div v-for="item in currentList"
                         :key="item.id"
                         v-if="item.id==id">
                        <el-card class="box-card">
                            <div>
                                <div class="head">
                                    <span class="title">relativeLinks</span>
                                </div>
                                <div v-for="(itm, index) in links"
                                     :key="index"
                                     class="text item">
                                    <div>{{itm.title}}</div>
                                    <a :href="'http://123.57.144.99/www2016/'+itm.path">{{'http://123.57.144.99/www2016/'+itm.path}}</a>

                                </div>
                            </div>

                        </el-card>
                    </div>
                    <div v-else
                         class="clearfix">
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import common from '../utils/utils.js'
export default {
	name: 'Content',
	data() {
		return {
			input: '',
			radio: this.$route.query.radio,
			val: this.$route.query.val,

			pageSize: 10,
			currentPage: 1,
			currentList: null, //当前页文章
			total: 0,
			related: [],
			id: 0,
			links: [],
			condition: '',
		}
	},
	methods: {
		getDataList(val, condition, page, count) {
            console.log(common)
			let that = this
			this.$http
				.get(
					`/api/search/api/study?keyword=${val}&&offset=${condition}`
				)
				.then((res) => {
					console.log(res, res.data.total)
                    that.total = res.data.total
                    
					that.currentList = res.data.data.map((item) => {
						return {
							...item,
							time: common.timeConvert(item.create_time),
						}
					})
					// that.total = res.num
					// that.related = res.related
				})
		},
		handleCurrentChange(val) {
            this.condition=val
			// 当前页
			this.getDataList(this.val, this.condition, val, this.pageSize)
		},
		prevClick(val) {
            this.currentPage
            this.condition=val
			this.getDataList(this.val, this.condition, val, this.pageSize)
			// 上一页
		},
		nextClick(val) {
            this.condition=val
			this.getDataList(this.val, this.condition, val, this.pageSize)
			// 下一页
		},
		go() {
			this.val = this.input
			this.getDataList(this.input, 'all', this.currentPage, this.pageSize)
		},

		relativeLink(id) {
			//是否显示相关链接
			this.id = id
			let parmas = {
				id: id,
			}
			this.$http
				.post('http://123.57.144.99/ir/related', parmas)
				.then((res) => {
					if (res.status == 'success') {
						this.links = res.papers
					}
				})
		},
	},

	mounted() {
		//axios请求数据
		this.getDataList(this.val, this.radio, this.currentPage, this.pageSize)
	},

}
</script>

<style lang="scss" scoped>
@import '../assets/css/_mixin.scss';
.Content {
	width: 100%;
	min-height: 100%;
	overflow: hidden;
	overflow-y: scroll;
	.layout {
		width: 1000px;
		margin: 50px auto;

		.search {
			@include box_flex;
			width: 100%;
			height: 50px;
			@include align;
			@include justify(center);
			img {
				width: 100px;
			}
			.el-input {
				width: 65%;
				margin: 0 30px;
			}
		}
		.bottom {
			width: 100%;
			@include box_flex;
			@include justify(center);
			.cont {
				width: 800px;
				margin-top: 30px;
				> p {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					font-family: 'Microsoft yahei';
					margin: 5px 0;
					padding-left: 20px;
					letter-spacing: 1px;
					span {
						color: red;
					}
				}
				.art {
					.text {
						margin: 5px 0;
						font-size: 14px;
					}
					.el-card {
						margin: 10px 0;
					}
				}
				.el-pagination {
					width: 50%;
					@include box_flex;
					@include align;
					margin: 40px auto;
					@include justify(center);
				}
			}
			.right {
				width: 200px;
				.item {
					width: 100%;
					margin: 5px 0;
					a {
						cursor: pointer;
						color: chartreuse;
						display: block;
					}
				}
				margin-top: 30px;
				@include box_flex;
				@include justify(space-around);
				padding: 50px 0;
				@include direction(column);
				.head {
					padding: 18px 20px;
					border-bottom: 1px solid #ebeef5;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
				}
				.title {
					font-size: 14px;
					color: yellowgreen;
				}
			}
		}
	}
}
</style>
