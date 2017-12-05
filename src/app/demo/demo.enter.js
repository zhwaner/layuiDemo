(function (layui) {
  layui.use(['table', 'layer', 'element', 'form'], function () {
    var table = layui.table
    var layer = layui.layer
    var form = layui.form
    var $ = layui.$
    table.render({
      url: '/demo/table/user/',
      elem: '#tableData',
      cellMinWidth: 80,
      id: 'tableData',
      limit: 15,
      page: {
        theme: '#1E9FFF',
        layout: ['limit', 'prev', 'page', 'next', 'skip', 'count']
      },
      cols: [
        [
          {type: 'checkbox'},
          {field: 'id', title: 'ID'},
          {field: 'city', title: '城市'},
          {field: 'sign', title: '签名'},
          {field: 'experience', title: '积分'},
          {field: 'classify', title: '职业'},
          {field: 'wealth', title: '财富', sort: true},
          {fixed: 'right', width: 178, align: 'center', toolbar: '#operateBar'}
        ]
      ]
    })
    // 监听表格复选框选择
    table.on('checkbox(tableData)', function (obj) {
      console.log(obj)
    })
    // 监听工具条
    table.on('tool(tableData)', function (obj) {
      var data = obj.data
      if (obj.event === 'detail') {
        layer.msg('ID：' + data.id + ' 的查看操作')
      }
      if (obj.event === 'del') {
        layer.confirm('真的删除行么', function (index) {
          obj.del()
          layer.close(index)
        })
      }
      if (obj.event === 'edit') {
        layer.alert('编辑行：<br>' + JSON.stringify(data))
      }
    })
    var active = {
      getCheckData: function () { // 获取选中数据
        var checkStatus = table.checkStatus('tableData')
        var data = checkStatus.data
        layer.alert(JSON.stringify(data))
      },
      getCheckLength: function () { // 获取选中数目
        var checkStatus = table.checkStatus('tableData')
        var data = checkStatus.data
        layer.msg('选中了：' + data.length + ' 个')
      },
      isAll: function () { // 验证是否全选
        var checkStatus = table.checkStatus('tableData')
        layer.msg(checkStatus.isAll ? '全选' : '未全选')
      },
      reload: function (key) {
        table.reload('tableData', {
          page: {
            curr: 1
          },
          where: key
        })
      },
      closeParent () {
        var index = parent.layer.getFrameIndex(window.name)
        parent.layer.close(index)
      }
    }
    $('.layui-btn').on('click', function () {
      var type = $(this).data('type')
      active[type] && active[type].call(this)
    })

    form.on('submit(search)', function (data) {
      active.reload(data.field)
      return false
    })
  })
})(window.layui)
