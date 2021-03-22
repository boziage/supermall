<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue';
import TabControl from 'components/content/tabControl/TabControl.vue';

import TabMenu from './childComps/TabMenu.vue';
import TabContentDetail from './childComps/TabContentDetail.vue';
import TabContentCategory from './childComps/TabContentCategory.vue'

import {getCategory, getSubcategory, getCategoryDetail} from "network/category";

export default {
  name: "Category",
    components: {
      NavBar,
      TabMenu,
      Scroll,
      TabControl,
      TabContentDetail,
      TabContentCategory,
    },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: 'pop',
    }
  },
  created() {
    // 1.请求分类数据
    this._getCategory()
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  mounted() {

  },
  methods: {
    // 用于获取总分类数据，因为个别数据获取要经常用，为了方便封装成方法（或者封装外面也可以）
    _getCategory() {
      getCategory().then(res => {
        // console.log(res);
        // 1.获取分类数据（最外层）
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },

    // 用于获取左边分类确定以后，通过传index来获取当前次分类的数据（包括次分类下的三级分类与下面商品流）
    _getSubcategories(index) {
      // 获取index与maitKey
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      // 通过mailkey进行网络请求，获取次分类数据
      getSubcategory(mailKey).then(res => {
        // 保存信息
        this.categoryData[index].subcategories = res.data
        // 赋值解构
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },

    // 获取商品流信息
     _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // console.log(res);
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },

    /**
     * 事件响应相关的方法
     */
    // 当用户点击左边次分类的时候，重新进行网络请求
    selectItem(index) {
      console.log('---');
      this._getSubcategories(index)
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(this.currentType);
    }
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  
  .content {
    /* position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px; */
    height: calc(100% - 44px - 49px);
    overflow: hidden;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>