export type Post = {
    id: string | null;
    content: string;
    date: Date;
    imageUrls: string[];
    like: number;
    comment: string[];
    likechack?: boolean;
    commentchack?: boolean;
    newComment?: string;
}



