# Respuestas a prueba tecnica Habits.AI

El repositorio con toda la informacion esta en:
  https://github.com/joalrope/habits-ai

# 1.- Lógica general.
  Para la resolución de este ejercio, primero tomaria el volumen solicitado y lo dividiria entre el menor volumenes de envaces  

# 2.- Lógica y uso de lenguaje JavaScript ES6+.
Para la rewsolusion dfe este ejercicio, crearia:  
    Varialble numerica: volTarget, este es el volumen solicitado,
    array numerico: volCase, Con los valores del volumen de los envases disponibles.
    array numerico, result, con los valores de las division entre volTarget y cada uno de los items del array volCase.
    json, cases, con los envases seleccionados y sus cantidades, ejemplo { '100': 1, '350': 2}

    luego iteraria el array colCase realizando la division de volTarget y volCase y el resultado lo introduzco en el 
    array result.
    Del array result realizo la consulta del valor mas cercano a 1, el envase seleccionado sera caseVol[indiceActual].

    Si el valor mas cercano a 1, es menor a 1, quiere decir que no se ha alcanzado volTarget y se repite el ciclo para calcular
    los demas envases, hasta que el resultado del valor mas cercano a 1 sea menor que 1.

# 3.- Base de datos no relacional.
    a. El total de puntos activos de los usuarios que se encuentran en México de
    entre el 10 y el 25 de noviembre ordenado de forma descendente.

    El backup en binaria, de la base de batos solicitada esta en la carpeta mongodb.

    El aggregate para est consulta es:
    
     const scoreSum = [
        { $match: { active: true } },
        { $match: { "user.country.name": "Mexico" } },
        { $match: { date: {$gte: new Date('2021-10-10'), $lte: new Date('2021-10-25') } } },
        { $sort : { date : 1 } },
        { $group: { _id: null, score: { $sum: 1 } } },
    ];

    db.userScore.aggregate(scoreSum);
    

    b. El top 2 de los usuarios con mayor puntaje menores de 50 años que estén
    activos.

    El aggregate para est consulta es:

    const topTwo = [
        { $match: { "user.age": { $lt: 50} } },
        { $match: { "user.active": true } },
        { $group: { _id: "$user.name", totalScore: { $sum: "$score" } } },
        { $sort : { totalScore : -1 } },
        { $limit : 2 }
    ];

    db.userScore.aggregate(topTwo);


    c. El promedio de puntos por semana de cada usuario, ordenado de menor
a mayor, sin contar los puntajes 0 

    const userAvg = [
        { $match: { "score":  { $gt: 0  } } },
        { $project: { _id: "$oid", user: "$user.name", week: { $week: "$date" }, "score": 1 } },
        { $group: { _id: {name: "$user", week: "$week"}, average:{$avg: "$score"} } },
        { $project: { _id: "$oid", user: "$_id.name", week: "$_id.week", average: "$average" } },
        { $group: { _id: "$user", weekaverage: {$push : {week: "$week", average: "$average"} } }},
        { $sort : { _id : 1, "weekaverage.week": 1 } },  
    ]; 

  db.userScore.aggregate(userAvg); 

# 4.- API REST básico.

    El desarrollo de la APIRest, esta el la carpeta crud, se utilizo el servicio de Mongo Atlas, para el 
    despliegue de la base de datos.

    La cadena de conexion es: mongodb+srv://mern_user:IaD64UtARWyWWbWP@cluster0.dwfox.mongodb.net/habitsai.

# 5.- ReactNative App.

    No realizado.