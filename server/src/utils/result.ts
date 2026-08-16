export const Result = {
  ok: (data: any, metadata?: any) => ({
    data,
    isSuccess: true,
    metadata: metadata || {}
  }),
  error: (error: any, metadata?: any) => {
    return {
      error: error instanceof Error ? {
        message: error.message,
        name: error.name,
        code: (error as any).code || undefined,
      } : error,
      data: {},
      isSuccess: false,
      metadata: metadata || {}
    }
  }
};