document.addEventListener("DOMContentLoaded", function() {
    var hamburger = document.querySelector(".hamburger .hamburger__inner");
    var wrapper = document.querySelector(".wrapper");
    var profile = document.querySelector(".top_navbar .fas");
    var profileDropdown = document.querySelector(".profile_dd");
  
    hamburger.addEventListener("click", function() {
      wrapper.classList.toggle("active");
    });
  
    profile.addEventListener("click", function() {
      profileDropdown.classList.toggle("active");
    });
  });


  // Tableau ajout et gestiion des travailleurs

  const form = document.getElementById('worker-form');
const tableBody = document.getElementById('table-body');
const workers = [];

form.addEventListener('submit', function(event) {
	event.preventDefault();
	const nom = document.getElementById('nom').value;
	const taches = document.getElementById('taches').value;
	const paie = document.getElementById('paie').value;

	const worker = {
		nom,
		taches,
		paie
	};

	workers.push(worker);
	addWorkerToTable(worker);
	form.reset();
});

function addWorkerToTable(worker) {
	const row = document.createElement('tr');
	const nomCell = document.createElement('td');
	nomCell.textContent = worker.nom;
	const tachesCell = document.createElement('td');
	tachesCell.textContent = worker.taches;
	const paieCell = document.createElement('td');
	paieCell.textContent = worker.paie;
	const actionCell = document.createElement('td');
	const editButton = document.createElement('button');
	editButton.textContent = 'Modifier';
	editButton.addEventListener('click', function() {
		editWorker(worker, row);
	});
	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Supprimer';
	deleteButton.addEventListener('click', function() {
		const index = workers.indexOf(worker);
		workers.splice(index, 1);
		row.remove();
	});
	actionCell.appendChild(editButton);
	actionCell.appendChild(deleteButton);
	row.appendChild(nomCell);
	row.appendChild(tachesCell);
	row.appendChild(paieCell);
	row.appendChild(actionCell);
	tableBody.appendChild(row);
}

function editWorker(worker, row) {
	const nomCell = row.cells[0];
	const tachesCell = row.cells[1];
	const paieCell = row.cells[2];
	const actionCell = row.cells[3];

	const editForm = document.createElement('form');
	const nomInput = document.createElement('input');
	nomInput.type = 'text';
	nomInput.value = worker.nom;
	nomInput.required = true;
	const tachesInput = document.createElement('input');
	tachesInput.type = 'text';
	tachesInput.value = worker.taches;
	tachesInput.required = true;
	const paieInput = document.createElement('input');
	paieInput.type = 'number';
	paieInput.value = worker.paie;
	paieInput.required = true;
	const saveButton = document.createElement('button');
	saveButton.type = 'submit';
	saveButton.textContent = 'Sauvegarder';
	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.textContent = 'Annuler';
	cancelButton.addEventListener('click', function() {
		editForm.remove();
		actionCell.style.display = 'block';
	});
	editForm.appendChild(nomInput);
	editForm.appendChild(tachesInput);
	editForm.appendChild(paieInput);
	editForm.appendChild(saveButton);
	editForm.appendChild(cancelButton);
	row.replaceWith(editForm);
	actionCell.style.display = 'none';

	editForm.addEventListener('submit', function(event) {
		event.preventDefault();
		worker.nom = nomInput.value;
		worker.taches = tachesInput.value;
		worker.paie = paieInput.value;
		nomCell.textContent = worker.nom;
		tachesCell.textContent = worker.taches;
		paieCell.textContent = worker.paie;
		editForm.remove();
		actionCell.style.display = 'block';
	});
}

document.getElementById("soumettre").addEventListener('click', saveTache);

function saveTache(){
    const nom = document.getElementById('nom');
    const taches = document.getElementById('taches');
    const paie = document.getElementById('paie');
    const tbody = document.getElementById('table-body')

    if(nom.value.replaceAll(' ', '') != ''){
        if(taches.value.replaceAll(' ', '') != ''){
            if(paie.value.replaceAll(' ', '') != ''){
                const worker = {
                    id: '',
                    nom: nom.value,
                    taches: taches.value,
                    paie: paie.value,
                    statut: 1,
                }
                const data = [];
                if(localStorage.getItem('TACHES')){
                    const allTache = JSON.parse(localStorage.getItem('TACHES'));
                    worker.id = 'TA' + (allTache.length+1);
                    allTache.push(worker)
                    localStorage.setItem('TACHES', JSON.stringify(allTache));

                } else{
                    worker.id =  'TA1';
                    data.push(worker)
                    localStorage.setItem('TACHES', JSON.stringify(data));
                }
                console.log(worker)
                const tr = document.createElement('tr');
                tr.id = 'line-'+ worker.id;

                tbody.append(tr)
                const tdnom = document.createElement('td');
                tdnom.id = 'td-nom-'+ worker.id;
                tdnom.textContent = worker.nom;
                tr.append(tdnom)

                const tdTache = document.createElement('td');
                tdTache.id = 'td-tache-'+ worker.id;
                tdTache.textContent = worker.taches;
                tr.append(tdTache)

                const tdPaie = document.createElement('td');
                tdPaie.id = 'td-paie-'+ worker.id;
                tdPaie.textContent = worker.paie;
                tr.append(tdPaie)

                const tdModifie = document.createElement('td');
                tdModifie.id = 'td-Modifie-'+ worker.id;
                tr.append(tdModifie)
                const buttonM = document.createElement('button');
                buttonM.id = 'modifie-'+ worker.id;
                buttonM.textContent = 'Modifier'
                tdModifie.append(buttonM)

                const tdSupprimer = document.createElement('td');
                tdSupprimer.id = 'td-Supprimer-'+ worker.id;
            
                tr.append(tdSupprimer)
                const buttonS = document.createElement('button');
                buttonS.id = 'Supprimer-'+ worker.id;
                buttonS.textContent = 'Supprimer';
                tdSupprimer.append(buttonS)

                nom.value = '';
                taches.value = '';
                paie.value = '';

                

            } else{
                paie.focus()
                paie.value = '';

            }
        } else{
            taches.focus()
            taches.value = ''

        } 
    } else{
        nom.focus()
        nom.value = ''
    }
}

function creerFormulaire(event){
    const identifiant = event.target.id.replace('modifie-', '')
    const notreTache = JSON.parse(localStorage.getItem('TACHES')).find(key =>key.id=== identifiant)

    const form_modifie = document.getElementById('form-modifie')
    form_modifie.textContent = ''
    const labelNom = document.createElement('label')
    form_modifie.append(labelNom)
    labelNom.innerHTML = 'Nom'
    const inputNom = document.createElement('input')
    inputNom.id = 'input-nom-'+identifiant
    inputNom.type = 'text'
    inputNom.id =  'input-nom'
    inputNom.value = notreTache.nom
    form_modifie.append(inputNom)

    const labelTache = document.createElement('label')
    labelTache.innerHTML = 'Taches'
    form_modifie.append(labelTache)
    const inputTaches= document.createElement('input')
    inputTaches.id = 'input-Taches-'+identifiant
    inputTaches.type = 'text'
    inputTaches.id =  'input-Taches'
    inputTaches.value = notreTache.taches
    form_modifie.append(inputTaches)

    const labelPaie = document.createElement('label')
    labelPaie.innerHTML = 'Paie'
    form_modifie.append(labelPaie)
    const inputPaie= document.createElement('input')
    inputPaie.id = 'input-Paie-'+identifiant
    inputPaie.type = 'text'
    inputPaie.id =  'input-Paie'
    inputPaie.value = notreTache.paie
    form_modifie.append(inputPaie)

    const envoyer = document.createElement('button')
    envoyer.type = 'button';
    envoyer.textContent = 'enregistre';
    envoyer.id =identifiant
    envoyer.addEventListener('click', modifierTaches)
    form_modifie.append(envoyer)


}

function afficheTaches(data){
    if (Array.isArray(data)){
        const tbody = document.getElementById('table-body')

        data.forEach(key => {
            const tr = document.createElement('tr');
                tr.id = 'line-'+ key.id;

                tbody.append(tr)
                const tdnom = document.createElement('td');
                tdnom.id = 'td-nom-'+ key.id;
                tdnom.textContent = key.nom;
                tr.append(tdnom)

                const tdTache = document.createElement('td');
                tdTache.id = 'td-tache-'+ key.id;
                tdTache.textContent = key.taches;
                tr.append(tdTache)

                const tdPaie = document.createElement('td');
                tdPaie.id = 'td-paie-'+ key.id;
                tdPaie.textContent = key.paie;
                tr.append(tdPaie)

                const tdModifie = document.createElement('td');
                tdModifie.id = 'td-Modifie-'+ key.id;
                tr.append(tdModifie)
                const buttonM = document.createElement('button');
                buttonM.id = 'modifie-'+ key.id;
                buttonM.textContent = 'Modifier'
                buttonM.addEventListener('click', creerFormulaire)
                tdModifie.append(buttonM)

                const tdSupprimer = document.createElement('td');
                tdSupprimer.id = 'td-Supprimer-'+ key.id;
            
                tr.append(tdSupprimer)
                const buttonS = document.createElement('button');
                buttonS.id = 'Supprimer-'+ key.id;
                buttonS.textContent = 'Supprimer';
                buttonS.addEventListener('click', supprimerTache)
                tdSupprimer.append(buttonS)
        })
    }
}

const allElement = JSON.parse(localStorage.getItem('TACHES')).filter(key =>key.statut != 0)

afficheTaches(allElement)


function modifierTaches(event){
    const ref = event.target.id
    const nom =  document.getElementById('input-nom');
    const taches =  document.getElementById('input-Taches');
    const paie =  document.getElementById('input-Paie');

    if(nom.value.replaceAll(' ', '') != ''){
        if(taches.value.replaceAll(' ', '') != ''){
            if(paie.value.replaceAll(' ', '') != ''){
                const dataTaches = JSON.parse(localStorage.TACHES)
                const concerne = dataTaches.find(key =>key.id === ref)
                const indice = dataTaches.indexOf(concerne)

                concerne.nom = nom.value
                concerne.taches = taches.value

                concerne.paie = paie.value
                dataTaches[indice] = concerne
                localStorage.setItem('TACHES', JSON.stringify(dataTaches))

                document.getElementById('form-modifie').innerHTML =''


            }
            
        }
    }

}


function supprimerTache(event){
    if(confirm('voulez-vous supprimer')){
        const identifiant = event.target.id.replace('Supprimer-', '')
        const bigData = JSON.parse(localStorage.TACHES) 
        const concerner = bigData.find(key =>key.id===identifiant)
        const indice = bigData.indexOf(concerner)
        concerner.statut = 0
        bigData[indice] = concerner
        localStorage.setItem('TACHES', JSON.stringify(bigData))
        document.getElementById(event.target.id.replace('Supprimer', 'line')).remove()
    }
    
}