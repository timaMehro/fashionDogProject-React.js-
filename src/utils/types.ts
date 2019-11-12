
export interface GetAllDataOptions {
    q?: string;
     page?: number;
      limit?: number;
       sort?: string;
}

export interface GenerateReportFileOptions {
    snapshotId: string;
    period: string;
}
