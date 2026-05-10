// app/api/upload-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('upload') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads/blog');
        
        // اطمینان از وجود پوشه
        await mkdir(uploadDir, { recursive: true });
        
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const imageUrl = `/uploads/blog/${filename}`;

        // فرمت پاسخ مورد انتظار CKEditor
        return NextResponse.json({ url: imageUrl });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}