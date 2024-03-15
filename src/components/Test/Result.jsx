import BasicTable from "./BasicTable"
import Chart from "./Chart"


const Result = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        {/* for uper test headings  */}
        <div>
            <div>
                <p>Test Results</p>
                <p>Your Current Test Results</p>
            </div>
            <div>
                <button>Take Exam</button>
            </div>
        </div>

        {/* for charts  */}
        <div>
            <div>
                <p>Current Test</p>
                <div>
                    <p>Total Questions :10</p>
                    <p>Correct Answers :5</p>
                    <p>Incorrect Answers :5</p>
                </div>
            </div>
            <div>
                <Chart />
            </div>
        </div>

        {/* questions  */}
        <div>
            <div>
                <p>All Questions and Correct Answers</p>
                <p>Question 1 - What is Java? - Correct</p>
                <p>Answer 1 - Java is a programming language developed by Sun Microsystems.</p>
            </div>
            <div>
                <p>Total Exams</p>
                <p>10</p>
            </div>
            <div>
                <p>Previous Exam</p>
                <p>Java Programming</p>
                <div>
                    <p>Total Questions :10</p>
                    <p>Correct Answers :5</p>
                    <p>Incorrect Answers :5</p>
                </div>
            </div>
        </div>

        {/* for table  */}
        <div>
            <BasicTable />
        </div>



    </div>
  )
}

export default Result
