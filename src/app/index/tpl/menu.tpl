{{ each list as item }}
<li class="layui-nav-item">
  <a class="javascript:;" href="javascript:;">
    <i class="layui-icon" style="top: 3px;">{{item.icon}}</i><cite>{{item.title}} {{item.children.length}}</cite>
  </a>
  <dl class="layui-nav-child">
    {{ each item.children as child }}
    <dd>
      <a href="javascript:;" _href="{{child.url}}">
        <cite>{{child.title}}</cite>
      </a>
    </dd>
    {{/each}}
  </dl>
</li>
{{/each}}
