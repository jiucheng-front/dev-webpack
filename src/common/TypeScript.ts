// import * as uuidv4 from "uuid/v4"
import * as uuidv4 from "uuid/v4"

import {
    ReadonlyObjectArray,
} from "./type"


export const RankList: ReadonlyObjectArray = [
    {
        id: uuidv4(),
        name: "Kurry",
        score: 99,
    },
    {
        id: uuidv4(),
        name: "Durrent",
        score: 100,
    },
]
