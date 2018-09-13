import {Data} from "@angular/router";

export interface IDataInfo {
  // new(): DataInfo;

  id: string;
  status: string;
  name: string;
  submitter: string;
  comment: string;
  exec_flow: string;
  mgc_home_gpath: string;
  build_id: string;
  requested_vcos: string[];
  // test_instance_counts
  DIED: number;
  QUEUED: number;
  RUNNING: number;
  PENDING: number;
  PASSED: number;
  HELD: number;
  COMPLETE: number;
  EXPECTED_FAIL: number;
  ALL_FAILED: number;
  CORE: number;
  FAILED: number;
  KILLED: number;
  ASSERT: number;
  TOTAL: number;
  ALL_PASSED: number;
  SUBMIT_ERROR: number;
  ////////////////////
  exec_top_gpath: string;
  // environment
  USE_CALIBREWB_64: string;
  CWB_GL1_YES: string;
  SQUISH_LICENSEKEY_DIR: string;
  USE_CALIBRE_64: string;
  DDM_ALLOW_DDMV1_MODEL: string;
  LIB_DIR: string;
  CWB_SHOW_LFT_CMD_STR: string;
  CALIBRE_SKIP_OS_CHECKS: string;
  OPC_MAP_BY_NAME: string;
  CALIBRE_NMOPC_QA_VT5_OVERRIDE: string;
  DESIGN_DIR: string;
  PLT_FLT: string;
  /////////////////////
  submit_time: string;
  active_end: string;
  active_duration: string;
  last_modified: string;
}

class DataInfo implements IDataInfo {
  id: string;
  status: string;
  name: string;
  submitter: string;
  comment: string;
  exec_flow: string;
  mgc_home_gpath: string;
  build_id: string;
  requested_vcos: string[];
  // test_instance_counts
  DIED: number;
  QUEUED: number;
  RUNNING: number;
  PENDING: number;
  PASSED: number;
  HELD: number;
  COMPLETE: number;
  EXPECTED_FAIL: number;
  ALL_FAILED: number;
  CORE: number;
  FAILED: number;
  KILLED: number;
  ASSERT: number;
  TOTAL: number;
  ALL_PASSED: number;
  SUBMIT_ERROR: number;
  ////////////////////
  exec_top_gpath: string;
  // environment
  USE_CALIBREWB_64: string;
  CWB_GL1_YES: string;
  SQUISH_LICENSEKEY_DIR: string;
  USE_CALIBRE_64: string;
  DDM_ALLOW_DDMV1_MODEL: string;
  LIB_DIR: string;
  CWB_SHOW_LFT_CMD_STR: string;
  CALIBRE_SKIP_OS_CHECKS: string;
  OPC_MAP_BY_NAME: string;
  CALIBRE_NMOPC_QA_VT5_OVERRIDE: string;
  DESIGN_DIR: string;
  PLT_FLT: string;
  /////////////////////
  submit_time: string;
  active_end: string;
  active_duration: string;
  last_modified: string;
}
