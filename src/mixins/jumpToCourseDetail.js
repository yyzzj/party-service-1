export default {
  methods: {
    /**
     * 跳转到课程详情页面
     * @param {string} courseId/
     */
    jump: function(courseId) {
      this.$router.push({
        path: '/courseDetail',
        query: {
          courseId
        }
      })
        .catch(() => { })
    }
  }
}
