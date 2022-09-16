<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :class="{ 'submenu-title-noDropdown': !isNest }"
          :index="resolvePath(onlyOneChild.path)"
          @click="toDashBoard(onlyOneChild.meta.title)"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="(child,index) in item.children"
        :key="index"
        :base-path="resolvePath(child.path)"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['navbar'])
  },
  data () {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    ...mapMutations('navbar', ['toDash']),
    toDashBoard (e) {
      //  (e);
      if (e == '首页') {
        this.toDash()
        //  (this.navbar);
      }
    },
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style scoped>
::v-deep .el-menu-item {
  padding-left: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(60, 105, 190) !important;
  font-size: 18px !important;
  padding: 0 30px;
}
::v-deep .el-submenu .el-menu-item:nth-of-type(1) {
  font-size: 14px !important;
}
::v-deep .el-submenu .el-menu-item:nth-of-type(1):hover {
  background: #26a4ff !important;
}
::v-deep .el-submenu__title {
  padding-left: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(60, 105, 190) !important;
  font-size: 18px !important;
  padding: 0 30px;
}
</style>