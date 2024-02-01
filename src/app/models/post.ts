export type Post = {
    content: string;
    date: Date;
    imageUrls: string[];
    like: number;
    comment: string[];
    likechack?: boolean;
    commentchack?: boolean;
    newComment?: string;
}



