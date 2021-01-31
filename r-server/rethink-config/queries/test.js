module.exports = function(r){
    r.connect({ host: 'localhost', port: process.env.RT_PORT || 28015 }, async function(err, connection) {
        if(err) throw err;
        // console.log('##################"" ', )
        let people = await r.db('test').tableList().contains('people').run(connection);
        console.log('people table :', await people)
        if (!people){
            r.db('test').tableCreate('people').run(connection, function(err, res) {
              console.log('people table created')
                if(err) throw err;
                console.log(res);
                for (let i = 0 ; i < 10 ; i ++){
                  r.table('people').insert({ name: 'Michel Sardou n°' + i }).run(connection, function(err, res){
                      if(err) throw err;
                      console.log(res);
                    });
                }

                r.table('people').insert([
                  { name: "William Adama", tv_show: "Battlestar Galactica",
                    posts: [
                      {title: "Decommissioning speech", content: "The Cylon War is long over..."},
                      {title: "We are at war", content: "Moments ago, this ship received word..."},
                      {title: "The new Earth", content: "The discoveries of the past few days..."}
                    ]
                  },
                  { name: "Laura Roslin", tv_show: "Battlestar Galactica",
                    posts: [
                      {title: "The oath of office", content: "I, Laura Roslin, ..."},
                      {title: "They look like us", content: "The Cylons have the ability..."}
                    ]
                  },
                  { name: "Jean-Marie Bigard", tv_show: "Star Trek TNG",
                    posts: [
                      {title: "Civil rights", content: "There are some words I've known since..."}
                    ]
                  }
                ])
                
            }).run(connection, function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            })

        } else {
          console.log('watcher')
          // WATCHER
          r.db('test').table('people').changes().run(connection, function(err, cursor) {
              if (err) throw err;
              cursor.each(function(err, row) {
                  if (err) throw err;
                  console.log('there is a catched change in the table : ', JSON.stringify(row, null, 2));
              });
          });
        
        }

       

        // BAD 
        for (let i = 0 ; i < 10 ; i ++){
            r.table('people').insert({ name: 'Michel Sardou n°' + i }).run(connection, function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            })
        }
        
        
        // GET ALL THE TABLE
        r.table('people').run(connection, function(err, cursor) {
            if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
                console.log('/////////////// COMPLETE TABLE ///////////////')
                console.log(JSON.stringify(result, null, 2));
            });
        });

        // FILTER TABLE FROM QUERY
        r.table('people').filter(r.row('name').eq('Jean-Marie Bigard')).run(connection, function(err, cursor) {
            if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
                console.log('/////////////// FILTERED QUERY : ///////////////')
                console.log(JSON.stringify(result, null, 2));
            });
        });

        r.table('people').update({type: "fictional"}).
            run(connection, function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            });


            // TODO : built in function to test if [table/item] exists ?
            // TODO : expliquer lambda  (reql : https://rethinkdb.com/docs/introduction-to-reql/ )
            // TODO : principe : detailler commande, ensuite l'envoyer à la db avec run()
        
      });
}
