<template>
  <div>
    <el-form :inline="true" style="margin-bottom:1em">
      <el-form-item label="类型:">
        <el-select placeholder="请选择" v-model="Type">
          <el-option
            v-for="item in TypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期:">
        <el-date-picker
          v-model="DateTimeRange"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00', '08:00:00']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字:">
        <el-select
          placeholder="请选择"
          v-model="KeywordType"
          class="keyword-type"
        >
          <el-option
            v-for="item in KeywordOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option
        ></el-select>
        <el-input
          v-model="Keyword"
          class="keyword"
          placeholder="请输入关键字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">搜索</el-button>
      </el-form-item>
      <el-form-item class="float-right">
        <el-button type="danger">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="Table"
      class="table-center"
      border
      style="margin-bottom:1em;"
    >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="Title" label="标题"></el-table-column>
      <el-table-column
        prop="Category"
        label="类别"
        min-width="130"
      ></el-table-column>
      <el-table-column
        prop="Date"
        label="日期"
        min-width="237"
      ></el-table-column>
      <el-table-column
        prop="Operator "
        label="管理员"
        min-width="115"
      ></el-table-column>
      <el-table-column label="操作" min-width="140">
        <template>
          <el-button size="mini" type="danger">删除</el-button>
          <el-button size="mini" type="success">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="12">
        <el-button size="medium">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Info } from "../../types/model/Info";

@Component
export default class Dashboard extends Vue {
  private Type = 1;
  private KeywordType = 1;
  private Keyword = "";
  private DateTimeRange: Date[] = [];
  private Table: Info[] = [
    {
      Title: "测试",
      Category: "国内新闻",
      Date: "2020-02-02",
      Operator: "alfred"
    }
  ];

  get TypeOptions() {
    return [
      {
        value: 1,
        label: "国际信息"
      },
      {
        value: 2,
        label: "国内信息"
      },
      {
        value: 3,
        label: "社会信息"
      }
    ];
  }
  get KeywordOptions() {
    return [
      { value: 1, label: "ID" },
      { value: 2, label: "标题" }
    ];
  }
  handleSizeChange(val: number) {
    console.log(val);
  }
  handleCurrentChange(val: number) {
    console.log(val);
  }
}
</script>
<style lang="scss" scoped>
.keyword-type {
  margin-right: 5px;
}
.keyword {
  margin-left: 5px;
}
</style>
