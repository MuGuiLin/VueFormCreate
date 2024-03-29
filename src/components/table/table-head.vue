<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="style">
        <colgroup>
            <col v-for="(column, index) in columns" :key="index" :width="setCellWidth(column, $index)">
        </colgroup>
        <thead>
            <tr>
                <th v-for="(column, index) in columns" :key="index" :class="alignCls(column)">
                    <div :class="cellClasses(column)">
                        <template v-if="column.type === 'selection'"><Checkbox :checked="isSelectAll" @on-change="selectAll"></Checkbox></template>
                        <template v-else>
                            {{ renderHeader(column, index) }}
                            <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                                <i class="ivu-icon ivu-icon-arrow-up-b" :class="{on: column._sortType === 'asc'}" @click="handleSort($index, 'asc')"></i>
                                <i class="ivu-icon ivu-icon-arrow-down-b" :class="{on: column._sortType === 'desc'}" @click="handleSort($index, 'desc')"></i>
                            </span>
                            <Poptip
                                v-if="isPopperShow(column)"
                                :visible.sync="column._filterVisible"
                                placement="bottom"
                                @on-popper-hide="handleFilterHide($index)">
                                <span :class="[prefixCls + '-filter']">
                                    <i class="ivu-icon ivu-icon-funnel" :class="{on: column._isFiltered}"></i>
                                </span>
                                <div slot="content" :class="[prefixCls + '-filter-list']" v-if="column._filterMultiple">
                                    <div :class="[prefixCls + '-filter-list-item']">
                                        <checkbox-group :model.sync="column._filterChecked">
                                            <checkbox v-for="(item, index) in column.filters" :key="index" :value="item.value">{{ item.label }}</checkbox>
                                        </checkbox-group>
                                    </div>
                                    <div :class="[prefixCls + '-filter-footer']">
                                        <i-button type="text" size="small" :disabled="!column._filterChecked.length" @click="handleFilter($index)">筛选</i-button>
                                        <i-button type="text" size="small" @click="handleReset($index)">重置</i-button>
                                    </div>
                                </div>
                                <div slot="content" :class="[prefixCls + '-filter-list']" v-else>
                                    <ul :class="[prefixCls + '-filter-list-single']">
                                        <li
                                            :class="itemAllClasses(column)"
                                            @click="handleReset($index)">全部</li>
                                        <li
                                            :class="itemClasses(column, item)"
                                            v-for="(item, index) in column.filters"
                                            :key="index"
                                            @click="handleSelect(index, item.value)">{{ item.label }}</li>
                                    </ul>
                                </div>
                            </Poptip>
                        </template>
                    </div>
                </th>
            </tr>
        </thead>
    </table>
</template>
<script>
    import CheckboxGroup from '../checkbox/checkbox-group.vue';
    import Checkbox from '../checkbox/checkbox.vue';
    import Poptip from '../poptip/poptip.vue';
    import iButton from '../button/button.vue';
    import Mixin from './mixin';
    import { deepCopy } from '../../utils/assist';

    export default {
        mixins: [ Mixin ],
        components: { CheckboxGroup, Checkbox, Poptip, iButton },
        props: {
            prefixCls: String,
            style: Object,
            columns: Array,
            objData: Object,
            data: Array,    // rebuildData
            columnsWidth: Object,
            fixed: {
                type: [Boolean, String],
                default: false
            }
        },
        computed: {
            isSelectAll () {
                let isSelectAll = true;

                for (let i = 0; i < this.data.length; i++) {
                    if (!this.objData[this.data[i]._index]._isChecked) {
                        isSelectAll = false;
                        break;
                    }
                }

                return isSelectAll;
            }
        },
        methods: {
            cellClasses (column) {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')
                    }
                ]
            },
            itemClasses (column, item) {
                return [
                    `${this.prefixCls}-filter-select-item`,
                    {
                        [`${this.prefixCls}-filter-select-item-selected`]: column._filterChecked[0] === item.value
                    }
                ]
            },
            itemAllClasses (column) {
                return [
                    `${this.prefixCls}-filter-select-item`,
                    {
                        [`${this.prefixCls}-filter-select-item-selected`]: !column._filterChecked.length
                    }
                ]
            },
            renderHeader (column, $index) {
                if ('renderHeader' in this.columns[$index]) {
                    return this.columns[$index].renderHeader(column, $index);
                } else {
                    return column.title || '#';
                }
            },
            selectAll () {
                const status = !this.isSelectAll;
                this.$parent.selectAll(status);
            },
            handleSort (index, type) {
                if (this.columns[index]._sortType === type) {
                    type = 'normal';
                }
                this.$parent.handleSort(index, type);
            },
            handleFilter (index) {
                this.$parent.handleFilter(index);
            },
            handleSelect (index, value) {
                this.$parent.handleFilterSelect(index, value);
            },
            handleReset (index) {
                this.$parent.handleFilterReset(index);
            },
            handleFilterHide (index) {
                this.$parent.handleFilterHide(index);
            }
        }
    }
</script>
