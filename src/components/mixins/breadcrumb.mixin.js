export default {
  data() {
    return {
      breadcrumbMap: [
        {
          route: "AddressList",
          breadCrumbs: [
            { path: "catalogue", to: "/catalogue" },
            { path: "address", to: "/catalogue/address/" }
          ]
        },
        {
          route: "AddressEdit",
          breadCrumbs: [
            { path: "catalogue", to: "/catalogue" },
            {
              path: "address",
              to: "/catalogue/address/view/1" //this will be changed according to address state
            },
            {
              path: "edit",
              to: "/catalogue/address/edit/"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getBreadcrumbs(route) {
      let crumb = this.breadcrumbMap.find(crumb => {
        return crumb.route == route.name;
      });
      return crumb == undefined
        ? this.createBreadcrumbs(route)
        : this.setCrumbDynamicUrls(crumb.breadCrumbs, route);
    },
    createBreadcrumbs(route) {
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
    },
    setCrumbDynamicUrls(breadCrumbs, route) {
      return breadCrumbs.map(crumb => {
        if (crumb.path === "address")
          //change url according to address state
          crumb.to = crumb.to.replace(/.$/, route.params.state);
        return crumb;
      });
    }
  }
};
