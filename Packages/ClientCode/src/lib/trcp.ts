import { createTRPCReact } from '@trpc/react-query'
import type {AppRouter} from "../../../server/src/controller/todoRouter"

export const trcp = createTRPCReact<AppRouter>()