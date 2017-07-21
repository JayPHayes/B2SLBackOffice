// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCmrYsv3Tc04ywtt4kVoBdCCCUZFfoGt6U",
    authDomain: "b2sl-fec70.firebaseapp.com",
    databaseURL: "https://b2sl-fec70.firebaseio.com",
    projectId: "b2sl-fec70",
    storageBucket: "b2sl-fec70.appspot.com",
    messagingSenderId: "230369581224"
  },

  FB_NODE_SCHOOL: {
    name:  "/schools",
    FB_ITEM_SCHOOL: {
      ITEM_KEY: "key",
      ITEM_NAME: "name",
      ITEM_Address: "address",
      ITEM_note01: "notes01",
      ITEM_Image: "image"
    }
  },

  FB_NODE_CLASSROOM: {
    name:  "/classrooms",
    FB_ITEM_CLASSRM: {
      ITEM_KEY: "key",
      ITEM_SCHOOL_KEY: "schoolkey",
      ITEM_NAME: "name",
      ITEM_Namelong: "namelong",
      ITEM_NameShort: "nameshort",
      ITEM_Notes01: "notes"
    }
  }
};
