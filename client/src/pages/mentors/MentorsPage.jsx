'use client';

import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Spinner, VStack } from '@chakra-ui/react';
import MentorSection from '@/components/mentors/MentorSection';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentors`);
        const data = await res.json();
        setMentors(data.mentors || []);
      } catch (err) {
        console.error('Failed to load mentors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(search.toLowerCase()) ||
    mentor.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
    <Sidebar />
    <Header />
    <Box px={{ base: 4, md: 8 }} py={6}>
      <VStack align="start" spacing={6}>
        <Heading size="lg">Meet Yourss Mentors</Heading>
        
        <Input
          placeholder="Search by name or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="400px"
        />

        {loading ? (
          <Spinner size="lg" />
        ) : (
          <MentorSection mentors={filteredMentors} />
        )}
      </VStack>
    </Box>
    <Footer />
    </>
  );
}
