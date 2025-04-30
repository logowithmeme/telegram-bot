def main():
    
    n = int(input().strip())
    results = []
    
    def process_test_case():
       
        x = int(input().strip())
        
        numbers_str = input().strip()
        numbers = numbers_str.split()
        
        
        if x != len(numbers):
            return -1
        
        
        total = 0
        
        def add_to_total(num, current_total):
            if num <= 0:  
                return current_total + (num ** 4)
            return current_total
        
        
        def process_numbers(nums, index, current_sum):
            if index >= len(nums):
                return current_sum
            return process_numbers(nums, index + 1, 
                                  add_to_total(int(nums[index]), current_sum))
        
        return process_numbers(numbers, 0, 0)
    
    
    def process_all_cases(case_num, results_list):
        if case_num > n:
            return results_list
        results_list.append(process_test_case())
        return process_all_cases(case_num + 1, results_list)
    
    results = process_all_cases(1, [])
    
    
    def print_results(results_list, index):
        if index >= len(results_list):
            return
        print(results_list[index])
        print_results(results_list, index + 1)
    
    print_results(results, 0)

if __name__ == "__main__":
    main()