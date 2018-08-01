import fetch from '../config/fetch'
import {
  getStore
} from '../config/mUtils'

/**
 * 用户登录
 */
export const login = (params) => fetch('/user_action/login.json', params);

/**
 * 联系我们页面，开始建立联系按钮
 */
export const buildContact = (params) => fetch('/open/contact_us/Add.json', params);

/**
 * 系统页，获取appSource 下拉列表
 */
export const getAppSource = (params) => fetch('/overview/overview_base/getAppSource.json', params);

/**
 * 系统页，获取左侧菜单栏
 */
export const getMenuList = (params) => fetch('/user_action/getMenuList.json', params);


/**
 * 系统页，退出登录,修改密码
 */
export const logout = (params) => fetch('/user_action/logout.json', params);
export const updatePassword = (params) => fetch('/user_action/update_password.json', params);


/**
 * 实时统计
 */
export const currentSituation = (params) => fetch('/overview/duly_statistics/current_situation.json', params);
export const periodAnalysis = (params) => fetch('/overview/duly_statistics/period_analysis.json', params);
export const channelTop10 = (params) => fetch('/overview/duly_statistics/channelTop10.json', params);
export const pageTop10 = (params) => fetch('/overview/duly_statistics/pageTop10.json', params);
export const xcxRealTimePeriod = (params) => fetch('/overview/xcx_realtime/period.json', params);
export const xcxRealTimeSummary = (params) => fetch('/overview/xcx_realtime/summary.json', params);
/**
 * 整体趋势
 */
export const overallTrend = (params) => fetch('/overview/overall_trend/overallTrend.json', params);
export const trendTop10 = (params) => fetch('/overview/overall_trend/trendTop10.json', params);


/**
 *用户活跃度
 */
export const activeTrend = (params) => fetch('/overview/use_situation/active_trend.json', params);


/**
 *移动端 用户&使用
 */
export const useAnalysis = (params) => fetch('/overview/use_situation/period_analysis.json', params);
export const versionDistribution = (params) => fetch('/analysis/version/distribution.json', params);
export const versiontop10 = (params) => fetch('/analysis/version/top10.json', params);
//地域分布
export const regionDistribution = (params) => fetch('/overview/use_situation/region_distribution.json', params);

/**
 * 网页  用户&使用
 */
export const webAreaAnalysis = (params) => fetch('/overview/web_user_situation/web_area_analysis.json', params);
export const webUsageAnalysis = (params) => fetch('/overview/web_user_situation/web_usage_analysis.json', params);
export const webSingleAnalysis = (params) => fetch('/overview/web_user_situation/web_single_analysis.json', params);
export const webUsageFreqAnalysis = (params) => fetch('/overview/web_user_situation/web_usage_freq_analysis.json', params);
export const webSpaceFreqAnalysis = (params) => fetch('/overview/web_user_situation/web_space_freq_analysis.json', params);
export const webVisitPvAnalysis = (params) => fetch('/overview/web_user_situation/web_visit_pv_analysis.json', params);



/**
 *留存率
 */
export const userRetention = (params) => fetch('/overview/retention_involvement/user_retention.json', params);


/**
 *用户参与分析
 */
export const singleDis = (params) => fetch('/overview/retention_involvement/single_dis.json', params);
export const singleTrend = (params) => fetch('/overview/retention_involvement/single_trend.json', params);
export const singleUser = (params) => fetch('/overview/retention_involvement/single_user_dis.json', params);
export const singleUserTrend = (params) => fetch('/overview/retention_involvement/single_user_trend.json', params);
export const sessionCntDis = (params) => fetch('/overview/retention_involvement/session_cnt_dis.json', params);
export const intervalReport = (params) => fetch('/overview/retention_involvement/interval_report.json', params);


/**
 *渠道趋势
 */
export const channelTrendTop = (params) => fetch('/overview/channel_activity/channelTrendTop10.json', params);
export const channelTrend = (params) => fetch('/overview/channel_activity/channel_trend.json', params);

/**
 * 网页配置
 */
export const queryPages = (params) => fetch('/asm/pageview_asm_page/query_pages.json', params);
export const stateList = (params) => fetch('/asm/pageview_asm_page/stateList.json', params, "GET");
// 获取pageId
export const acPageId = (params) => fetch('/asm/pageview_asm_page/acPageId.json', params);
// 新增
export const addPage = (params) => fetch('/asm/pageview_asm_page/add_page.json', params);
// 编辑
export const updatePage = (params) => fetch('/asm/pageview_asm_page/update_page.json', params);
// 删除
export const deletePages = (params) => fetch('/asm/pageview_asm_page/deletePages.json', params);



/**
 * 网页路径分析(网页)
 */
export const rootUrl = (params) => fetch('/analysis/web_path_flow/root_url.json', params, 'GET');
export const rootData = (params) => fetch('/analysis/web_path_flow/root_data.json', params);
export const nextData = (params) => fetch('/analysis/web_path_flow/next_data.json', params);

/**实时统计zaweb */
export const webPeriodStatistic = (params) => fetch('/overview/web_real_time_statistic/web_period_statistic.json', params);

/**网站概况 */
export const webTrendAnalysis = (params) => fetch('/overview/web_situation/web_trend_analysis.json', params);


/**小程序 页面TOP10 */
export const xcxRealtimeUrl = (params) => fetch('/overview/xcx_realtime/url.json', params);

/**
 * 流量路径分析(移动端 IOS Android)
 */
export const queryAppRootByOs = (params) => fetch('/asm/root_url_config/query_app_root_by_os.json', params, "GET");
export const firstSiteAnalysis = (params) => fetch('/overview/flow_path/first_site_analysis.json', params);
export const nextSiteAnalysis = (params) => fetch('/overview/flow_path/next_site_analysis.json', params);


/**
 * 移动圈选
 */
export const qrCreate = (params) => fetch('/asm/xflow_qr_code/can_qr_create.json', params, "GET");

/**
 * 用户管理
 */
export const handleQuery = (params) => fetch('/analysis/user_record/query.json', params);
export const loginQuery = (params) => fetch('/analysis/user_record/query_login.json', params);
export const tryQuery = (params) => fetch('/open/contact_us/query.json', params);

/**
 * 错误内容分析
 */
export const queryAppVersion = (params) => fetch('/authority/app_version/queryAppVersion.json', params);
export const queryAppVersionSum = (params) => fetch('/authority/app_version/queryAppVersionSum.json', params);
export const errorSummary = (params) => fetch('/overview/error_info_analysis/error_summary.json', params);
export const errorCntAll = (params) => fetch('/overview/error_info_analysis/error_cnt_all.json', params);

/**
 * 页面加载性能
 */
export const pageLoadTrend = (params) => fetch('/overview/page_load_analysis/page_load_trend.json', params);
export const urlLoadTrend = (params) => fetch('/overview/page_load_analysis/url_load_trend.json', params);



/**漏斗 */
export const queryFunnels = (params) => fetch('/funnel/funnel_config/queryFunnels.json', params);
export const funnelShow = (params) => fetch('/funnel/funnel_config/funnelShow.json', params);
export const sdkClassDescQueryPages = (params) => fetch('/overview/sdk_class_desc/query_pages.json', params);
export const sdkClassDescUpdateById = (params) => fetch('/overview/sdk_class_desc/updateById.json', params);
export const sdkClassDescDeleteClassDesc = (params) => fetch('/overview/sdk_class_desc/deleteClassDesc.json', params);
export const insertClassDesc = (params) => fetch('/overview/sdk_class_desc/insertClassDesc.json', params);
export const pageFunnels = (params) => fetch('/funnel/funnel_config/pageFunnels.json', params);
export const insertFunnel = (params) => fetch('/funnel/funnel_config/insertFunnel.json', params);

export const updateFunnel = (params) => fetch('/funnel/funnel_config/updateFunnel.json', params);
export const funnelModel = (params) => fetch('/funnel/funnel_config/funnelModel.json', params);
export const deleteFunnel = (params) => fetch('/funnel/funnel_config/deleteFunnel.json', params);

//网络性能
export const netAnalysisHosts = (params) => fetch('/overview/net_analysis/hosts.json', params);
export const loadtimeTrend = (params) => fetch('/overview/net_analysis/loadtime_trend.json', params);
export const areaDistribute = (params) => fetch('/overview/net_analysis/area_distribute.json', params);
export const netAnalysisPath = (params) => fetch('/overview/net_analysis/path.json', params);

/**
 * 监控预警
 */
export const pageQuery = (params) => fetch('/monitor/monitor_warning/pageQuery.json', params);
export const dropDownSet = (params) => fetch('/monitor/monitor_warning/dropDownSet.json', params);
export const monitorAdd = (params) => fetch('/monitor/monitor_warning/monitorAdd.json', params);
export const monitorDetail = (params) => fetch('/monitor/monitor_warning/monitorDetail.json', params);
export const monitorUpdate = (params) => fetch('/monitor/monitor_warning/monitorUpdate.json', params);
export const usingStatusUpdate = (params) => fetch('/monitor/monitor_warning/usingStatusUpdate.json', params);
export const monitorDelete = (params) => fetch('/monitor/monitor_warning/monitorDelete.json', params);


/**
 * 网页  网页配置
 */
export const pageConfigQuery = (params) => fetch('/track/page_config/query.json', params);
export const pageConfigSites = (params) => fetch('/track/page_config/sites.json', params);
//新增
export const pageConfigAdd = (params) => fetch('/track/page_config/add.json', params);
//编辑
export const pageConfigUpdate = (params) => fetch('/track/page_config/update.json', params);
//删除
export const pageConfigDelete = (params) => fetch('/track/page_config/delete.json', params);


/**
 * 网页  区块配置
 */
export const blockQuery = (params) => fetch('/track/area_config/query.json', params);
// 查询页面ID 是否存在
export const queryPageId = (params) => fetch('/track/page_config/page_site.json', params);
//新增
export const blockAdd = (params) => fetch('/track/area_config/add.json', params);
//编辑
export const blockUpdate = (params) => fetch('/asm/pageview_asm_area/update_area.json', params);
//删除
export const blockDelete = (params) => fetch('/track/area_config/delete.json', params);


/**
 * 埋点查询页面
 */
export const pageOverview = (params) => fetch('/track/data/page_overview.json', params);
export const buttonOverview = (params) => fetch('/track/data/button_overview.json', params);



/**
 * 移动端 区块配置
 */
export const queryAreas = (params) => fetch('/asm/pageview_asm_area/query_areas.json', params);
export const acPageInfo = (params) => fetch('/asm/pageview_asm_page/acPageInfo.json', params);
//新增
export const addArea = (params) => fetch('/asm/pageview_asm_area/add_area.json', params);
//编辑
export const updateArea = (params) => fetch('/asm/pageview_asm_area/update_area.json', params);
//删除
export const deleteAreas = (params) => fetch('/asm/pageview_asm_area/deleteAreas.json', params);


/**
 * 移动端 活动实时评估
 */
export const regisiterQuery = (params) => fetch('/analysis/activity_summary/regisiter_query.json', params);
export const asmQuery = (params) => fetch('/analysis/activity_summary/asm_query.json', params);


/**
 * 移动端 配置实时评估
 */
export const queryAsmBlock = (params) => fetch('/asm/asm_ilog_query/queryAsmBlock.json', params);
export const queryIlogUrl = (params) => fetch('/asm/asm_ilog_query/queryIlogUrl.json', params);

/**
 * 网页 来源分析
 */
export const querySourceHost = (params) => fetch('/analysis/web_refer/source_host.json', params);
export const querySourceOverview = (params) => fetch('/analysis/web_refer/day_trend.json', params);
export const querySourceOverviewHour = (params) => fetch('/analysis/web_refer/hour_trend.json', params);
export const querySourceAnalysis = (params) => fetch('/analysis/web_refer/url.json', params);


/**
 * 业务自定义
 */
export const queryXflowSource = (params) => fetch('/source/xflow_source_config/query_xflow_source.json', params);
//角色渠道缓存清除
export const DeleteRedisDataByKey = (params) => fetch('/overview/redis_controller/Delete_Redis_Data_By_Key.json', params,'GET');
//新增
export const insertXflowSource = (params) => fetch('/source/xflow_source_config/insert_xflow_source.json', params);
//编辑
export const updateXflowSource = (params) => fetch('/source/xflow_source_config/update_xflow_source.json', params);
//删除
export const deleteXflowSource = (params) => fetch('/source/xflow_source_config/delete_xflow_source.json', params);


/**
 * 埋点配置页面
 */
export const visualEvaluate = (params) => fetch('/overview/visual_config_evaluate/visual_evaluate.json', params);
export const visualOverview = (params) => fetch('/overview/visual_config_evaluate/visual_overview.json', params);

/**
 * 渠道配置
 */
export const channelConfigPage = (params) => fetch('/asm/external_channel/channelConfigPage.json', params);
//新增
export const insertChannelConfig = (params) => fetch('/asm/external_channel/insertChannelConfig.json', params);
//编辑
export const updateChannelConfig = (params) => fetch('/asm/external_channel/updateChannelConfig.json', params);
//删除
export const deleteChannelConfig = (params) => fetch('/asm/external_channel/deleteChannelConfig.json', params);


/**
 * 小程序 用户&使用
 */
export const hourSummary = (params) => fetch('/overview/xcx_user_situation/hour_summary.json', params);
export const deviceTop10 = (params) => fetch('/overview/xcx_user_situation/device_top10.json', params);
export const terminalSummary = (params) => fetch('/overview/xcx_user_situation/terminal_summary.json', params);
export const areaSummary = (params) => fetch('/overview/xcx_user_situation/area_summary.json', params);

/**
 * 路径页面管理
 */
export const queryUrls = (params) => fetch('/asm/root_url_config/query_pages.json', params);
//新增
export const addRootUrl = (params) => fetch('/asm/root_url_config/add_root_url.json', params);
//编辑
export const updateRootUrl = (params) => fetch('/asm/root_url_config/update_root_url.json', params);
//删除
export const deleteRootUrls = (params) => fetch('/asm/root_url_config/delete_root_urls.json', params);


/**
 * 网页路径分析
 */
export const queryRootUrls = (params) => fetch('/asm/root_url_config/queryRootUrls.json', params, "GET");
export const appFirstSiteAnalysis = (params) => fetch('/asm/flow_updown_url/first_site_analysis.json', params);
export const appNextSiteAnalysis = (params) => fetch('/asm/flow_updown_url/next_site_analysis.json', params);

/**
 * 智能路径
 */
export const configQuery = (params) => fetch('/analysis/intelligent_path/config_query.json', params);
export const configAll = (params) => fetch('/analysis/intelligent_path/config_all.json', params);
//新增
export const configAdd = (params) => fetch('/analysis/intelligent_path/config_add.json', params);
//编辑
export const configUpdate = (params) => fetch('/analysis/intelligent_path/config_update.json', params);
//删除
export const configDelete = (params) => fetch('/analysis/intelligent_path/config_delete.json', params);
//报告数据
export const reportQuery = (params) => fetch('/analysis/intelligent_path/report_query.json', params);
//保存漏斗
export const reportToFunnel = (params) => fetch('/analysis/intelligent_path/report_to_funnel.json', params);


/**
 * 小程序  留存&参与
 */
export const retentionRatio = (params) => fetch('/overview/xcx_retention/retention_ratio.json', params);
export const timeRange = (params) => fetch('/overview/xcx_retention/time_range.json', params);
export const timeTrend = (params) => fetch('/overview/xcx_retention/time_trend.json', params);
export const visitInterval = (params) => fetch('/overview/xcx_retention/visit_interval.json', params);
export const visiFrequency = (params) => fetch('/overview/xcx_retention/visit_frequency.json', params);




//圈选配置
///circle/page_config/add.json
export const circlePageConfigAdd = (params) => fetch('/circle/element_config/add.json', params);
export const circlePageConfigUpdate = (params) => fetch('/circle/element_config/update.json', params);
export const circlePageConfigDelete = (params) => fetch('/circle/element_config/delete.json', params);
export const circlePageConfigReport = (params) => fetch('/circle/element_config/query_report.json', params);
