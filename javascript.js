<script>
            const myForm = document.getElementById("myForm")
            const inpFile = document.getElementById("inpFile")
            const formData = new FormData();

            myForm.addEventListener("submit", e => {
                e.preventDefault();

                formData.append("inpFile", inpFile.files[0])                
                uploadData(formData)
            })

            function uploadData(formData){
                let data = {
                    'file': formData
                }
                const request = new XMLHttpRequest()
                request.open('POST', `/uploadData/${data}`)
                request.onload = () => {
                    const flaskMessage = request.responseText
                    console.log(flaskMessage)
                }
                request.send(data)
            }

            function compileCode(){
                let data = {
                    'name': 'Tarek'
                }
                const request = new XMLHttpRequest()
                request.open('GET', `/preprocess/${JSON.stringify(data)}`)
                request.onload = () => {
                    const flaskMessage = request.responseText
                    console.log(flaskMessage)
                }
                request.send(data)
            }
        </script>