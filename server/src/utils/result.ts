export const Result = {
  ok: (data: any, metadata?: any) => ({
    data,
    isSuccess: true,
    metadata: metadata || {}
  }),
  error: (error: any, metadata?: any) => ({
    error,
    isSuccess: false,
    metadata: metadata || {}
  })
};