export default interface ISteamNews {
    appid? : number | null, 
    author : string | null,
    contents : string | null,
    date : number | null,
    feed_type:number | null,
    feedlabel : string | null,
    gid : string | null,
    is_external_url : boolean | null,
    title : string | null,
    url : string | null
  }
  