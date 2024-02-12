export interface DbMap<RAW, DATA> {
  //   db_to_app(db_raw: RAW): DATA;
  app_to_db(data: DATA): RAW;
}
