
interface Def {
  readonly code: number;
  readonly msg: string;
  readonly time: string;
}

declare namespace Res {

  export interface LoginResult extends Def {
    result: {
      admin_id: number;
      admin_token: string;
      nick_name: string;
      project_ids: number[];
    };
  }
  export enum Domain {
    BASE_URL = 'BASE_URL',
    LOGIN_URL = 'LOGIN_URL'
  }
}
