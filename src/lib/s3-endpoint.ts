/**
 * The S3 endpoint advertised in code samples across the site.
 *
 * User data is served from a domain of its own, separate from `fil.one` (FIL-627).
 * The gateways serve untrusted, user-uploaded content, and reputation systems act
 * on the registrable domain rather than the subdomain — so hosting that content
 * under `fil.one` means one abusive upload can flag the console, this site, the
 * docs and company email along with it.
 *
 * Every sample on the site quotes the default region, `eu-west-1`. Keep this in
 * step with `getS3Endpoint(S3Region.EuWest1, Stage.Production)` in the `fil-one`
 * monorepo (`packages/shared/src/constants.ts`), which is what the console shows
 * users and what presigned URLs are actually signed against. Regions there
 * migrate one at a time, so only change this once `eu-west-1` has flipped —
 * publishing it early advertises a hostname that fails TLS.
 *
 * Unlike `./console-url.ts`, this is a plain constant rather than a function.
 * That helper has to be called per render because it reads `window.location`, and
 * pre-rendering would otherwise freeze the build-time host into every page. This
 * value doesn't depend on the host the visitor is on, so a constant is correct
 * and pre-renders fine.
 */
export const S3_ENDPOINT = "https://eu-west-1.s3.filonecontent.com";

/**
 * The same endpoint without a scheme, for clients that want a bare host —
 * PyArrow's `endpoint_override`, rclone remotes, and similar.
 */
export const S3_ENDPOINT_HOST = "eu-west-1.s3.filonecontent.com";
