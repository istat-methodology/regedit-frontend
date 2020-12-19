export function createBreadcrumbs(route) {
  let pathArray = route.path.split("/");
  pathArray.shift();
  //console.log(route.params);
  if (Object.keys(route.params).length > 0) {
    //if route has a parameter remove it from array
    pathArray.pop();
  }
  let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    var to = "/";
    if (idx > 0) {
      for (var i = 0; i < idx; i++) {
        to += breadcrumbArray[i].path + "/";
      }
    }
    to += path;
    //console.log(to);
    breadcrumbArray.push({
      path: path,
      to: to
    });
    return breadcrumbArray;
  }, []);
  return breadcrumbs;
}
