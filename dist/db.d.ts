import mongoose from "mongoose";
export declare let UserModal: mongoose.Model<{
    username?: string | null;
    password?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username?: string | null;
    password?: string | null;
}, mongoose.Document<unknown, {}, {
    username?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare let TagModal: mongoose.Model<{
    title?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title?: string | null;
}, mongoose.Document<unknown, {}, {
    title?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare let ContentModal: mongoose.Model<{
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, {
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    tags: mongoose.Types.ObjectId[];
    type?: number | null;
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare let LinkModal: mongoose.Model<{
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, mongoose.Document<unknown, {}, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=db.d.ts.map