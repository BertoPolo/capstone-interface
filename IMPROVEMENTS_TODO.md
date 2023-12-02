## IMPROVEMENTS / TO DO / NICE TO HAVE

- Merge functions ,there are too much wich are similar or equal... to share functions between components
- Add breadcrumbs (visual route links) https://react-bootstrap-v4.netlify.app/components/breadcrumb/
- If you go out from creating new item without uploading an image, get an alert
- At createitem, when choose main category,should only displays related categories
- Change the filter query for an array : `${process.env.React_APP_SERVER}items?${filterQuery}`
- Improve pages changing/navigating. removing functions setting just where you are, without true/false. Do a dictionary with routes
- URL routes ( single Item done)
- Responsive Card payment
- Add "token required" to swagger and finish it
- BackEnd - don't send all filtered items if not asking
- Improve security
- Show some graphs in the backoffice about sales or whatever you want => https://nivo.rocks/line/
- Create discount vouchers
- Link Cart with token/user

## Actives TO DO

- Change navigation among pages, from states to params
- From /singleItem, can’t click on categories and move there
- From /singleItem, in XS screen you can’t see categories
- Clean unused imports
- Reset scroll when navigate
- Implement to see filters and items in route/path ( params ) => then modify searches to be by params
- Change Readme.md
- At /outlet add title, right now is not intuitive that you are there
- Do a rollback after any admin change after 15min or just create a public admin user to apply the rollback
- Testing
