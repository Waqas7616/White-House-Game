// CandidatePopup.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function CandidatePopup({ candidateIndex, onClose, data }) {
    const [candidateData, setCandidateData] = useState(null);

    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                // console.log('Candidate Name in fetchCandidateData:', candidateName);
                const candidatesCollectionRef = collection(firestore, 'candidates');
                const queries = query(candidatesCollectionRef, where('index', '==', candidateIndex));
                const candidateDocSnapshot = await getDocs(queries);


                if (!candidateDocSnapshot.empty) {
                    // Retrieve data from snapshot.data()
                    setCandidateData(candidateDocSnapshot.data());
                } else {
                    console.log(`Candidate data for ${candidateIndex} not found.`);
                }
            } catch (error) {
                console.error('Error fetching candidate data:', error);
            }
        };

        fetchCandidateData();
    }, [candidateIndex, data]);

    return (
        <div className="popup">
            <div className="popup-content">
                <button onClick={onClose} className="close-button">
                    Close
                </button>
                {candidateData && (
                    <>
                        <h2>{candidateData.name}</h2>
                        <p>Date of Birth: {candidateData.dob}</p>
                        <p>ID: {candidateData.id}</p>
                        <p>Occupation: {candidateData.occupation}</p>
                        <p>Party: {candidateData.party}</p>
                        <p>Place of Birth: {candidateData.pob}</p>
                        <p>Info1: {candidateData.info1}</p>
                        <p>Info2: {candidateData.info2}</p>
                        <p>Info3: {candidateData.info3}</p>
                        <p>Info4: {candidateData.info4}</p>
                        {/* Add other candidate details as needed */}
                    </>
                )}
            </div>
        </div>
    );
}

export default CandidatePopup;
