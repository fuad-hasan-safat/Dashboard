import Link from 'next/link'

export default function NotFound() {
    return (

        <section>
            <div className='container grid h-screen justify-items-center items-center'>

                <div className='w-full text-center text-black font-bold text-4xl  '>

                    <h2>পৃষ্ঠাটি পাওয়া যাচ্ছে না ৪০৪ </h2>
                    
                    <Link href="/"><span className='text-blue-600'>প্রচ্ছদ পৃষ্ঠায় যান</span></Link>

                </div>
                
            </div>
        </section>

    )
}