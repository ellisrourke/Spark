import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import PopularJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

const Nearbyjobs = () => {
  const router = useRouter()
  const { data, isLoading, error } = useFetch(
    'search', { query: 'Suncorp', num_pages: "1" }
  );

  const handleCardPress = (job) => {
    router.push(`/job-details/${job.job_id}`);
    //setSelectedJob(job.job_id);
  };


  return (
    <View style={styles.stylescontainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleCardPress={handleCardPress}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs;