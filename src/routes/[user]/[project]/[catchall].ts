
export async function get({ url }): Promise<any> {
  console.log(url);
  return {
		status: 302,
		headers: {
			location: "https://tai.maintained.cc"+url.pathname
		}
  }
}
