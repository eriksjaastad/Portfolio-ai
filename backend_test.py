import requests
import sys
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url="https://logicdesigns.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, expected_keys=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else f"{self.api_url}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json={}, headers=headers, timeout=10)

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response content if it's JSON
                try:
                    json_data = response.json()
                    print(f"   Response type: {type(json_data)}")
                    
                    if expected_keys and isinstance(json_data, dict):
                        for key in expected_keys:
                            if key in json_data:
                                print(f"   ✓ Found expected key: {key}")
                            else:
                                print(f"   ✗ Missing expected key: {key}")
                                success = False
                    elif expected_keys and isinstance(json_data, list):
                        print(f"   Response is list with {len(json_data)} items")
                        if len(json_data) > 0 and isinstance(json_data[0], dict):
                            sample_keys = list(json_data[0].keys())
                            print(f"   Sample item keys: {sample_keys}")
                    
                    return success, json_data
                except Exception as e:
                    print(f"   Response is not JSON: {str(e)}")
                    return success, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error response: {error_data}")
                except:
                    print(f"   Error response: {response.text}")

            return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200,
            expected_keys=["message"]
        )

    def test_profile_endpoint(self):
        """Test profile endpoint"""
        return self.run_test(
            "Profile Endpoint",
            "GET", 
            "profile",
            200,
            expected_keys=["name", "title", "tagline", "summary", "contact"]
        )

    def test_skills_endpoint(self):
        """Test skills endpoint"""
        return self.run_test(
            "Skills Endpoint",
            "GET",
            "skills", 
            200
        )

    def test_experience_endpoint(self):
        """Test experience endpoint"""
        return self.run_test(
            "Experience Endpoint",
            "GET",
            "experience",
            200
        )

    def test_projects_endpoint(self):
        """Test projects endpoint"""
        return self.run_test(
            "Projects Endpoint", 
            "GET",
            "projects",
            200
        )

    def validate_profile_data(self, profile_data):
        """Validate profile data structure and content"""
        print(f"\n🔍 Validating Profile Data Structure...")
        
        required_fields = {
            "name": str,
            "title": str, 
            "tagline": str,
            "summary": str,
            "contact": dict,
            "location": str
        }
        
        validation_passed = True
        
        for field, expected_type in required_fields.items():
            if field not in profile_data:
                print(f"❌ Missing required field: {field}")
                validation_passed = False
            elif not isinstance(profile_data[field], expected_type):
                print(f"❌ Field {field} has wrong type. Expected {expected_type}, got {type(profile_data[field])}")
                validation_passed = False
            else:
                print(f"✅ Field {field}: {expected_type.__name__}")
        
        # Validate contact info
        if "contact" in profile_data:
            contact_fields = ["email", "linkedin", "portfolio", "location"]
            for field in contact_fields:
                if field in profile_data["contact"]:
                    print(f"✅ Contact {field}: {profile_data['contact'][field]}")
                else:
                    print(f"❌ Missing contact field: {field}")
                    validation_passed = False
        
        # Check for Erik-specific content
        if profile_data.get("name") == "Erik Sjaastad":
            print("✅ Profile contains Erik Sjaastad's name")
        else:
            print(f"❌ Expected Erik Sjaastad, got: {profile_data.get('name')}")
            validation_passed = False
            
        if "React" in profile_data.get("tagline", ""):
            print("✅ Tagline contains React")
        else:
            print(f"❌ Tagline should contain React: {profile_data.get('tagline')}")
            validation_passed = False
        
        return validation_passed

    def validate_skills_data(self, skills_data):
        """Validate skills data structure"""
        print(f"\n🔍 Validating Skills Data Structure...")
        
        if not isinstance(skills_data, list):
            print(f"❌ Skills should be a list, got {type(skills_data)}")
            return False
            
        if len(skills_data) == 0:
            print("❌ Skills list is empty")
            return False
            
        print(f"✅ Skills list contains {len(skills_data)} items")
        
        # Check first skill structure
        sample_skill = skills_data[0]
        required_fields = ["name", "category", "level"]
        
        validation_passed = True
        for field in required_fields:
            if field not in sample_skill:
                print(f"❌ Missing skill field: {field}")
                validation_passed = False
            else:
                print(f"✅ Skill field {field}: {sample_skill[field]}")
        
        # Check for expected skills
        skill_names = [skill.get("name") for skill in skills_data]
        expected_skills = ["React", "JavaScript", "TypeScript", "Node.js"]
        
        for expected_skill in expected_skills:
            if expected_skill in skill_names:
                print(f"✅ Found expected skill: {expected_skill}")
            else:
                print(f"❌ Missing expected skill: {expected_skill}")
                validation_passed = False
        
        return validation_passed

    def validate_experience_data(self, experience_data):
        """Validate experience data structure"""
        print(f"\n🔍 Validating Experience Data Structure...")
        
        if not isinstance(experience_data, list):
            print(f"❌ Experience should be a list, got {type(experience_data)}")
            return False
            
        if len(experience_data) == 0:
            print("❌ Experience list is empty")
            return False
            
        print(f"✅ Experience list contains {len(experience_data)} items")
        
        # Check first experience structure
        sample_exp = experience_data[0]
        required_fields = ["company", "position", "duration", "location", "description", "technologies"]
        
        validation_passed = True
        for field in required_fields:
            if field not in sample_exp:
                print(f"❌ Missing experience field: {field}")
                validation_passed = False
            else:
                print(f"✅ Experience field {field}: {type(sample_exp[field])}")
        
        # Check for expected companies
        companies = [exp.get("company") for exp in experience_data]
        expected_companies = ["98point6 Inc.", "iStreamPlanet", "Redfin"]
        
        for expected_company in expected_companies:
            if expected_company in companies:
                print(f"✅ Found expected company: {expected_company}")
            else:
                print(f"❌ Missing expected company: {expected_company}")
                validation_passed = False
        
        return validation_passed

    def validate_projects_data(self, projects_data):
        """Validate projects data structure"""
        print(f"\n🔍 Validating Projects Data Structure...")
        
        if not isinstance(projects_data, list):
            print(f"❌ Projects should be a list, got {type(projects_data)}")
            return False
            
        if len(projects_data) == 0:
            print("❌ Projects list is empty")
            return False
            
        print(f"✅ Projects list contains {len(projects_data)} items")
        
        # Check first project structure
        sample_project = projects_data[0]
        required_fields = ["title", "description", "technologies"]
        
        validation_passed = True
        for field in required_fields:
            if field not in sample_project:
                print(f"❌ Missing project field: {field}")
                validation_passed = False
            else:
                print(f"✅ Project field {field}: {type(sample_project[field])}")
        
        # Check for expected projects
        project_titles = [proj.get("title") for proj in projects_data]
        expected_projects = ["Gerrymander Explorer", "Indulge - Seattle Tweet Map", "Pebble Design System"]
        
        for expected_project in expected_projects:
            if expected_project in project_titles:
                print(f"✅ Found expected project: {expected_project}")
            else:
                print(f"❌ Missing expected project: {expected_project}")
                validation_passed = False
        
        return validation_passed

def main():
    print("🚀 Starting Erik Sjaastad Portfolio API Tests")
    print("=" * 60)
    
    tester = PortfolioAPITester()
    
    # Test all endpoints
    root_success, root_data = tester.test_root_endpoint()
    profile_success, profile_data = tester.test_profile_endpoint()
    skills_success, skills_data = tester.test_skills_endpoint()
    experience_success, experience_data = tester.test_experience_endpoint()
    projects_success, projects_data = tester.test_projects_endpoint()
    
    # Validate data structure and content
    validation_results = []
    
    if profile_success and profile_data:
        validation_results.append(tester.validate_profile_data(profile_data))
    
    if skills_success and skills_data:
        validation_results.append(tester.validate_skills_data(skills_data))
        
    if experience_success and experience_data:
        validation_results.append(tester.validate_experience_data(experience_data))
        
    if projects_success and projects_data:
        validation_results.append(tester.validate_projects_data(projects_data))
    
    # Print final results
    print("\n" + "=" * 60)
    print("📊 FINAL TEST RESULTS")
    print("=" * 60)
    print(f"API Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Data Validation passed: {sum(validation_results)}/{len(validation_results)}")
    
    total_tests = tester.tests_run + len(validation_results)
    total_passed = tester.tests_passed + sum(validation_results)
    
    print(f"Overall Success Rate: {total_passed}/{total_tests} ({(total_passed/total_tests)*100:.1f}%)")
    
    if total_passed == total_tests:
        print("🎉 ALL TESTS PASSED! Backend API is working correctly.")
        return 0
    else:
        print("❌ Some tests failed. Please check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())