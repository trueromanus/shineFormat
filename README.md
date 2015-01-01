shineFormat
===========

Some JavaScript functions for string formatting.

You may use pipeline function in namespace shineFormat:

```
shineFormat.pipeline(...)
```

or as prototype string method:

```
"text".pipeline(...)
```

### Quick example

```
"Type text to".pipeline(
	[
		shineFormat.concat,
		"{firstName} {lastName}",
		{
			firstName:"Nicole",
			lastName:"Bushe"
		}
	],
	[
		shineFormat.replace,
		"to",
		"to "
	],
	[
		shineFormat.wrap,
		"Nicole Bushe",
		{
			before:"<",
			after:">"
		}
	]
);

result: Type text to <Nicole Bushe>
```

### Other functions

Formatting on keys

##### shineFormat.formatKeys( "1. {begin}bcd{end}", { begin: "A", end: "." } )
1. Abcd.

Formatting on indexes

##### shineFormat.formatNumeric( "1. {0}pple{1} 2. {0}ndroid{1}", [ "A" , "." ] )
1. Apple. 2. Android.

Wrapping string template 

##### shineFormat.formatWrap( "Village Street 15,16 LGD", "15,16", { before: "(", after: ")" } ); 
Village Street (15,16) LGD

